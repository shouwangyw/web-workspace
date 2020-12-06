const http = require("http");
const fs = require("fs");

http.createServer((req, res) => {
  const {url, method} = req
  if(url == '/' && method == 'GET'){
    fs.readFile('../index.html', (err, data) => {
      res.setHeader('Content-Type', 'text/html')
      res.end(data)
    })
  }else if(url == '/users' && method == 'GET'){
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify([{name: 'zhangsan', age: 20}]))
  }
}).listen(3002);
