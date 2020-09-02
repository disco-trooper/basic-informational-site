let http = require('http');
let fs = require('fs');
const CONTENT_TYPE = { 'Content-Type': 'text/html' };

http
  .createServer((req, res) => {
    if (req.url === '/') req.url = '/index.html';
    fs.readFile(__dirname + req.url, (err, data) => {
      if (err) {
        fs.readFile(__dirname + '/404.html', (err, data) => {
          if (err) {
            res.writeHead(500, CONTENT_TYPE);
            return res.end('500 - INTERNAL ERROR');
          } else {
            res.writeHead(404, CONTENT_TYPE);
            return res.end(data);
          }
        });
      } else {
        res.writeHead(200, CONTENT_TYPE);
        return res.end(data);
      }
    });
  })
  .listen(8080);
