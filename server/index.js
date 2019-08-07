const path = require('path');
const connect = require('connect');
const app = connect();
const fs = require('fs');
const db = require('../db/index.js');

const dir = path.join(__dirname, 'public');

const mime = {
  gif: 'image/gif',
  jpg: 'image/jpeg',
  png: 'image/png',
  html: 'text/html'
};

app.use(function (req, res) {
  if (req.method !== 'GET') {
    res.statusCode = 501;
    res.setHeader('Content-Type', 'text/plain');
    return res.end('Method not implemented');
  }



  const reqpath = req.url.toString().split('?')[0];
  console.log(reqpath);
  if (reqpath === '/') {
    const file = path.join(dir, '/index.html');
    console.log(file);
    const type = 'text/html';
    const static = fs.createReadStream(file);
    static.on('open', function () {
        res.setHeader('Content-Type', type);
        static.pipe(res);
    });
    static.on('error', function () {
        res.setHeader('Content-Type', 'text/plain');
        res.statusCode = 404;
        res.end('Not found');
    });
  }else{
    res.setHeader('Content-Type', 'image/jpeg');
    db.getImage(res, 16399)
    .then(() => {
      console.log('Done!');
    })
    .catch(error => {
      console.log('Something went horribly wrong!', error);
    });
  }
});

app.listen(8080, function () {
    console.log('Listening on http://localhost:8080/');
});


// if (file.indexOf(dir + path.sep) !== 0) {
//   res.statusCode = 403;
//   res.setHeader('Content-Type', 'text/plain');
//   return res.end('Forbidden');
// }
// const type = mime[path.extname(file).slice(1)] || 'text/plain';
