const path = require('path');
const connect = require('connect');
const app = connect();
const fs = require('fs');
const db = require('../db/index.js');
const Busboy = require('busboy');
const multer = require('multer');
const multiparty = require('multiparty');
const busboyPromise = require('busboy-promise');

const dir = path.join(__dirname, 'public');

const mime = {
  gif: 'image/gif',
  jpg: 'image/jpeg',
  png: 'image/png',
  html: 'text/html'
};

app.use(function (req, res) {

  if (req.method === 'POST'){
    const busboy = new Busboy({ headers: req.headers });
    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
      console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);
      return db.postImage(file)
      .then(oid => {
        console.log('the oid was,', oid);
        return oid
      })
    });
    busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
      console.log('Field [' + fieldname + ']: value: ' + val);
      db.postIssue(val)
      .then(result => console.log('result:', result))
      .catch(err => console.error(err))
    });
    busboy.on('finish', function() {
      console.log('Done parsing form!');
      res.writeHead(303, { Connection: 'close', Location: '/' });
      res.end();
    });
    req.pipe(busboy)
  }

  else if (req.method === 'GET'){
    const reqpath = req.url.toString().split('?')[0];
    console.log(reqpath);
    if (reqpath === '/') {
      const file = path.join(dir, '/index.html');
      const static = fs.createReadStream(file);
      static.on('open', function () {
        res.setHeader('Content-Type', 'text/html');
        static.pipe(res);
      });
      static.on('error', function () {
        res.setHeader('Content-Type', 'text/plain');
        res.statusCode = 404;
        res.end('Not found');
      });
    }else{
      const [_, oid, ext] = reqpath.split(/[\s.\/]+/)
      const type = mime[ext] || 'text/plain';
      res.setHeader('Content-Type', type);
      // const oid = reqpath.split(/[\s.\/]+/)[1];
      db.getImage(res, oid)
      .then(() => {
        console.log('Done!');
      })
      .catch(error => {
        console.log('Something went wrong!', error);
      });
    }
  }
});

app.listen(8080, function () {
    console.log('Listening on localhost:8080/');
});


// if (file.indexOf(dir + path.sep) !== 0) {
//   res.statusCode = 403;
//   res.setHeader('Content-Type', 'text/plain');
//   return res.end('Forbidden');
// }
// const type = mime[path.extname(file).slice(1)] || 'text/plain';

  // if (req.method !== 'GET') {
  //   res.statusCode = 501;
  //   res.setHeader('Content-Type', 'text/plain');
  //   return res.end('Method not implemented');
  // }
    // console.log('got a post request');
    // const busboy = new Busboy({ headers: req.headers });
    // busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
    //   file.pipe(db.postImage)
    //   file.on('end', function() {
    //     console.log('File [' + fieldname + '] Finished');
    //   });
    // });
    // busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
    //   console.log('Field [' + fieldname + ']: value: ' + inspect(val));
    // });
    // req.pipe(busboy)
