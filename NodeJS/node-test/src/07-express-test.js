const express = require('express')
const fs = require('fs')
const path = require('path')

const app = express()
app.get('/', (req, res) => {
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
})
app.get('/users', (req, res) => {
  // 接口编写
  res.setHeader('Content-Type', 'application/json')
  // res.end(字符串 | Buffer)
  res.end(JSON.stringify([{name: 'zhangsan', age: 20}]))
})

app.listen(3000)