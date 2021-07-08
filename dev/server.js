const http = require('http');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const mime = require('mime-types');

const port = 8088;

const server = http.createServer( (request, response) => {
 
  const url = request.url;
  // console.log('url--', url);
  
  if(url === '/') {
    // 默认html请求
    response.writeHead(200, {'Content-Type': mime.contentType('html')});
    const file = fs.readFileSync(path.resolve('dev/index.html'), {encoding: 'utf-8'});
    return response.end(file);
  } else if(url.indexOf('/src') > -1) {
    // 资源请求
    // console.log('src---', url, path.extname(url), path.resolve(`.${url}`));
    response.writeHead(200, {'Content-Type': mime.contentType(path.extname(url))});
    const file = fs.readFileSync(path.resolve(`.${url}`), {encoding: 'utf-8'});
    return response.end(file);
  }
  // 其他类型的请求
  response.writeHead(200, {'Content-Type': mime.contentType('text')});
  response.end('')
  return;
});

server.listen(port);


console.log(chalk.green(`server running at: ${port}  http://localhost:${port}` ))
