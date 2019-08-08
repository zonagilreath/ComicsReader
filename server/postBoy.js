const Busboy = require('busboy');

module.exports = (headers, res, db)=>{
  const oids =  [];
  const formData = {};
  const busboy = new Busboy({ headers });
  busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
    console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);
    return db.postImage(file)
    .then(oid => {
      console.log('the oid was,', oid);
      oids.push(oid)
      return oid
    })
  });
  busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
    console.log('Field [' + fieldname + ']: value: ' + val);
    formData[fieldname] = val;
  });
  busboy.on('finish', function() {
    console.log('Done parsing form!');
    console.log(oids);
    db.postIssue(formData.title, formData.year, formData.issue_number)
    .then(results => {
      const issueID = results[0].id;
      db.createIssuePageLinks(issueID, oids)
    })
    .then(()=>{
      res.writeHead(303, { Connection: 'close', Location: '/' });
      res.end();
    })
    .catch(err=>console.error(err))
  });
  return busboy;
}

