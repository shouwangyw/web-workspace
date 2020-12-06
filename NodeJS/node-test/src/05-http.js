const http = require('http')
const fs = require('fs')
const path = require('path')

http.createServer((req, res) => {
  console.log('来了一个请求！')
  const {url, method, headers} = req
  if(url === '/' && method === 'GET'){
    // 读取首页
    console.log(path.resolve('../index.html')) // 绝对路径 
    fs.readFile(path.resolve('../index.html'), (err, data) => {
      if(err){
        res.statusCode = 500 // 服务器内部错误
        res.end('500 - Internal Server Error')
        return
      }
      res.statusCode = 200  // 请求成功
      res.setHeader('Content-Type', 'text/html')
      // res.setHeader('Content-Type', 'text/plain')
      res.end(data)
    })
    // res.end('服务器响应啦！')
  } else if (url === '/users' && method === 'GET'){
    // 接口编写
    res.setHeader('Content-Type', 'application/json')
    // res.end(字符串 | Buffer)
    res.end(JSON.stringify([{name: 'zhangsan', age: 20}]))
  } else if(headers.accept.indexOf('image/*') !== -1 && method === 'GET'){
    console.log(path.resolve(url))
    fs.createReadStream(path.resolve('.' + url)).pipe(res)
  }
}).listen(3000);