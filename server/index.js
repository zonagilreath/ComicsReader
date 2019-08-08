const path = require('path');
const connect = require('connect');
const app = connect();
const fs = require('fs');
const db = require('../db/index.js');
const PostBoy = require('./postBoy.js')


const distDir = path.resolve(__dirname, '../client/dist');

const mime = {
  gif: 'image/gif',
  jpg: 'image/jpeg',
  png: 'image/png',
  html: 'text/html'
};

app.use(function (req, res) {
  if (req.method === 'POST'){
    postboy = PostBoy(req.headers, res, db);
    req.pipe(postboy);
  }

  else if (req.method === 'GET'){
    const [reqpath, queryString] = req.url.toString().split('?');
    console.log(reqpath);
    console.log(queryString);
    if (reqpath === '/') {
      if (queryString){
        const queryObj = queryString.split('&')
                        .reduce((acc, query) => {
                          const [q, v] = query.split('=');
                          acc[q] = v;
                          return acc
                        }, {});
        console.log('queries obj', queryObj);
        db.search(queryObj)
        .then(results => {
          console.log(results);
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(results));
        })
      }else {
        const file = path.join(distDir, '/index.html');
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
      }
    }else if (reqpath.split('/')[1] === 'issues'){
      const [_, __, issue_id] = reqpath.split(/[\s.\/]+/);
      db.getPages(issue_id)
      .then(results => {
        console.log(results);
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(results));
      })

    }else if (reqpath.split('/')[1] === 'content'){
      const [_, __, oid, ext] = reqpath.split(/[\s.\/]+/);
      console.log('from content route', _, __, oid, ext);
      const type = mime[ext] || 'text/plain';
      res.setHeader('Content-Type', type);
      db.getImage(res, oid)
      .catch(error => {
        console.log('Something went wrong!', error);
      });
    }
  }
});

app.listen(8080, function () {
    console.log('Listening on localhost:8080/');
});
