const http = require('http');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const mime = require('mime-types');
const { spawn, exec, execFile, fork } = require('child_process');


// tsc编译
console.log(chalk.green('tsc 开始编译...'));
exec('tsc -w', {}, (err, stdout, stderr) => {
  if (err) {
    console.log(chalk.red('tsc编译出错---'))
    console.log(chalk.red(stderr))
  }
  console.log('tsc编译结束---');
})

// server
const port = 8088;
const server = http.createServer((request, response) => {
  const url = request.url;
  let data = null;
  console.log('url:', url);
  switch (true) {
    case url === '/':  // 默认html请求
      response.writeHead(200, { 'Content-Type': mime.contentType('html') });
      data = fs.readFileSync(path.resolve('src/index.html'), { encoding: 'utf-8' });
      break;
    case url.indexOf('/dist') > -1: // js 资源请求
      const pathName = path.extname(url) ? url : url + '.js'
      response.writeHead(200, { 'Content-Type': mime.contentType(path.extname(pathName)) });
      data = fs.readFileSync(path.resolve(`.${pathName}`), { encoding: 'utf-8' });
      break;
    default:
      // response.writeHead(200, {'Content-Type': mime.contentType('text')});
      break;
  }
  response.end(data)
});

server.listen(port);


console.log(chalk.green(`server running at: ${port}  http://localhost:${port}`))



