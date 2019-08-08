const pgp = require('pg-promise');
      path = require('path'),
      {LargeObjectManager} = require('pg-large-object'),
      {createReadStream, createWriteStream} = require('fs');


const dbURL = `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/imagetest`,
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

module.exports = {};

 // db.connect()
 // .then(obj => {
 //   console.log('connected to psql on port', process.env.PGPORT)
 //   obj.done(); // success, release the connection;
 // })
 // .catch(error => {
 //   console.log('ERROR:', error.message || error);
 // });
 
 // db.tx(tx => {
 //  const man = new LargeObjectManager({pgPromise: tx});
 // 
 //  // If you are on a high latency connection and working with
 //  // large LargeObjects, you should increase the buffer size.
 //  // The buffer should be divisible by 2048 for best performance
 //  // (2048 is the default page size in PostgreSQL, see LOBLKSIZE)
 //  const bufferSize = 16384;
 // 
 //  return man.createAndWritableStreamAsync(bufferSize)
 //  .then(([oid, stream]) => {
 //    // The server has generated an oid
 //    console.log('Creating a large object with the oid', oid);
 // 
 //    const fileStream = createReadStream(path.resolve(__dirname, '../Star Wars 070 (2019)', 'Star Wars 070-000.jpg'));
 //    fileStream.pipe(stream);
 // 
 //    return new Promise((resolve, reject) => {
 //      stream.on('finish', resolve);
 //      stream.on('error', reject);
 //    });
 //  });
 // })
 // .then(() => {
 //  console.log('Done!');
 // })
 // .catch(error => {
 //  console.log('Something went horribly wrong!', error);
 // });

module.exports.postImage = (file) => {

  db.tx(tx => {
    const man = new LargeObjectManager({pgPromise: tx});
    const bufferSize = 16384;

    return man.createAndWritableStreamAsync(bufferSize)
    .then(([oid, stream]) => {
      console.log('Creating a lob with oid:', oid);
      file.pipe(stream)
      // file.on('data', (data)=>{
      //   console.log('got some data boss!', data);
      //   data.pipe(stream)
      // })

      return new Promise((resolve, reject) => {
        stream.on('finish', resolve);
        stream.on('error', reject);
      });
    });
  })
}

// test oid = 16399

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