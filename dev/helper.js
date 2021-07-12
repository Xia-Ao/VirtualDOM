const path = require('path');

const fileExtName = {
  js: 'js',
  image: 'image',
  css: 'css',
  json: 'json',
  html: 'html',
}

function getFileType(url) {
  if(url === '/') {
    return fileExtName.html;
  }
  const extName = path.extname(url);
  // if(url)
}