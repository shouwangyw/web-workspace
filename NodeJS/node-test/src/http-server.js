const http = require("http");
const fs = require("fs");

http.createServer((req, res) => {
  const {url, method} = req
  if(url == '/' && method == 'GET'){
    fs.readFile('../index.html', (err, data) => {
      res.setHeader('Content-Type', 'text/html')
      res.end(data)
    })
  }else if(url == '/users' && (method == 'GET' || method == 'POST')){
    res.setHeader('Content-Type', 'application/json')
    // 简单请求 CORS
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3002')
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    res.end(JSON.stringify([{name: 'zhangsan', age: 20}]))
  }else if(url == '/users' && method == 'OPTIONS'){
    res.writeHead(200, {
      'Access-Control-Allow-Origin': 'http://localhost:3002',
      'Access-Control-Allow-Headers': 'X-Token,Content-Type',
      'Access-Control-Allow-Methods': 'GET,POST,PUT',
      'Access-Control-Allow-Credentials': 'true'
    })
    res.end();
  }
}).listen(3000);
