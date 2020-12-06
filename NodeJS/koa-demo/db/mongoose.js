const mongoose = require('mongoose')

mongoose.connect('mongodb://192.168.254.130:27017/kaikeba')

const conn = mongoose.connection

conn.on('open', () => {
  console.log('连接成功')
})