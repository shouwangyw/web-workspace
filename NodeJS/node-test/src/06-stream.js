// stream：用于 node 中数据流的交互接口
const fs = require('fs')
const rs = fs.createReadStream('./conf.js')  // 读取流
const ws = fs.createWriteStream('./info.txt') // 写入流

rs.pipe(ws)

// 二进制操作友好
const rs2 = fs.createReadStream('./01.png')  // 读取流
const ws2 = fs.createWriteStream('./02.pg') // 写入流
rs2.pipe(ws2)
