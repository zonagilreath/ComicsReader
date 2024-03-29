const pgp = require('pg-promise');
      path = require('path'),
      {LargeObjectManager} = require('pg-large-object'),
      {createReadStream, createWriteStream} = require('fs');


const dbURL = `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`,
      initOptions = {
        // global event notification;
        error(error, e) {
          if (e.cn) {
            console.log('CN:', e.cn);
            console.log('EVENT:', error.message || error);
          }
        }
      },
      db = pgp(initOptions)(dbURL);

db.connect()
.then(()=>console.log('connected to db'))
.catch(err => console.error(err))

module.exports = {};

module.exports.postIssue = (title, year, issue_number)=>{
  return db.query('INSERT INTO issues (title, year, issue_number) values ($1, $2, $3) RETURNING id;', [title, year, issue_number]);
}

module.exports.createIssuePageLinks = (issue_id, pageOIDs)=>{
  return db.tx(t => {
    const queries = pageOIDs.map(oid => {
        return t.none('INSERT INTO issue_pages (issue_id, pageoid) VALUES($1, $2)', [issue_id, oid]);
    });
    return t.batch(queries);
  })
  .then(data => {
    console.log(data);
    return data
  })
}

module.exports.postImage = (file) => {
  return db.tx(tx => {
    const man = new LargeObjectManager({pgPromise: tx});
    const bufferSize = 16384;

    return man.createAndWritableStreamAsync(bufferSize)
    .then(([oid, stream]) => {
      console.log('Creating a lob with oid:', oid);
      file.pipe(stream)

      return new Promise((resolve, reject) => {
        stream.on('finish', ()=>{
          resolve(oid)
        });
        stream.on('error', reject);
      });
    });
  })
}

module.exports.getPages = (issue_id) => {
  return db.query('SELECT pageoid from issue_pages WHERE issue_id = $1 ORDER BY pageoid ASC;', issue_id);
}

module.exports.getImage = (res, oid) => {
  return db.tx(tx => {
    const man = new LargeObjectManager({pgPromise: tx});
    const bufferSize = 16384;
   
    return man.openAndReadableStreamAsync(oid, bufferSize)
    .then(([size, stream]) => {
      stream.pipe(res);

      return new Promise((resolve, reject) => {
        stream.on('end', resolve);
        stream.on('error', reject);
      });
    })
  })
}

module.exports.search = (queryObj) => {
  const acceptable = ['title', 'issue_number', 'year'];
  let queryString = 'select issues.*, (select p.pageoid from issue_pages as p where p.issue_id = issues.id limit 1) as coverimage from issues WHERE ';
  let queryParams = [];
  let paramsCount = 0;
  for (let query in queryObj){
    if (!acceptable.includes(query)){
      continue;
    }
    const comparator = (query === 'title') ? ' ilike ' : '= '
    queryString += query + comparator + '$' + ++paramsCount + ' AND ';
    queryParams.push(decodeURIComponent(queryObj[query]).toLowerCase());
  }
  if (paramsCount) queryString =queryString.replace(/\sAND\s$/, ';');
  else queryString = queryString.replace(/\sWHERE\s$/, ';');
  console.log(queryString, paramsCount);
  return db.query(queryString, queryParams);
}