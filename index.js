import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

http
  .createServer(function (request, response) {
    console.log('request ', request.url);
    let filePath = './public' + request.url; // not sure if this is the file path
    if (
      filePath === './public/' ||
      filePath === './public/memes' ||
      filePath === './public/memes/index.html'
    ) {
      filePath = './public/index.html';
    }

    const extname = String(path.extname(filePath)).toLowerCase();
    const mimeTypes = {
      '.html': 'text/html',
      '.js': 'text/javascript',
      '.css': 'text/css',
      '.json': 'application/json',
      '.png': 'image/png',
      '.jpg': 'image/jpg',
      '.gif': 'image/gif',
      '.svg': 'image/svg+xml',
      '.txt': 'text/txt',
      '.wav': 'audio/wav',
      '.mp4': 'video/mp4',
      '.woff': 'application/font-woff',
      '.ttf': 'application/font-ttf',
      '.eot': 'application/vnd.ms-fontobject',
      '.otf': 'application/font-otf',
      '.wasm': 'application/wasm',
    };

    const contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, 'utf8', (error, content) => {
      if (error) {
        response.writeHead(404, { 'Content-Type': 'text/html' });
        response.end("404: You won't find it here", 'utf-8');
      } else {
        response.writeHead(200, { 'Content-Type': contentType });
        response.end(content, 'utf-8');
      }
    });

    //  fs.readFile(filePath, function (error, content) {
    //    if (error) {
    //      if (error.code === 'ENOENT') {
    //        fs.readFile('./404.html', function (error, content) {
    //          response.writeHead(404, { 'Content-Type': 'text/html' });
    //          response.end("404: You won't find it here", 'utf-8');
    //        });
    //      } else {
    //        response.writeHead(500);
    //        response.end('404 File not being found' + error.code + ' ..\n'); // edited
    //      }
    //    } else {
    //      response.writeHead(200, { 'Content-Type': contentType });
    //      response.end(content, 'utf-8');
    //    }
    //  });
  })
  .listen(3000);
console.log('Server running at http://127.0.0.1:3000/');

// const hostname = '127.0.0.1';
// const port = 3000;
//
// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World');
// });
//
// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });
//
// const fs = require('fs');
//
// fs.readFile(__dirname + '/public', (error, data) => {
//   if (error) {
//     throw error;
//   }
//   console.log(data.toString());
// });
//
