
const http = require("http");
const fs = require("fs");

function requestHandler(req, res) {
  console.log(req.url);

  let filePath;

  switch (req.url) {
    case '/':
      filePath = './MyResume.html';
      break;
    case '/resume.css':
      filePath = './resume.css';
      break;
    case '/resume1.js':
      filePath = './resume1.js';
      break;
    default:
      if (req.url.startsWith('/images/MyImage/') || req.url.startsWith('/images/1images/')||req.url.startsWith('/images/')) {
        filePath = `.${req.url}`;
      } else {
        filePath = './404.html';
      }
  }

  fs.readFile(filePath, function (err, data) {
    if (err) {
      console.log('Error', err);
      return res.end('<h1>Error</h1>');
    }
    res.writeHead(200, { 'Content-Type': getContentType(filePath) });
    res.end(data);
  });
}

function getContentType(filePath) {
  if (filePath.endsWith('.html')) {
    return 'text/html';
  } else if (filePath.endsWith('.css')) {
    return 'text/css';
  } else if (filePath.endsWith('.js')) {
    return 'text/javascript';
  } else if (filePath.endsWith('.jpeg')) {
    return 'image/jpeg';
  }else if (filePath.endsWith('.jpg')) {
    return 'image/jpg';
  }else if (filePath.endsWith('.png')) {
    return 'image/png';
  } else if (filePath.endsWith('.gif')) {
    return 'image/gif';
  }else{
    return '404/html';
  }
}

const port = 9999;
const server = http.createServer(requestHandler);

server.listen(port, function (err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Server running on port:', port);
});
