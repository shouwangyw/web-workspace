const conf = require('./conf')
const MongoClient = require('mongodb').MongoClient
// 事件派发器
const EventEmittter = require('events').EventEmitter

class MongoDB {
  constructor(conf){
    // 保存conf
    this.conf = conf
    this.emitter = new EventEmittter()
    // 连接
    this.client = new MongoClient(conf.url, {useNewUrlParser: true})
    this.client.connect(err => {
      if(err){
        throw err
      }
      console.log('Connected Successfully!')
      this.emitter.emit('connect')
    })
  }
  // 监听事件方法
  once(event, cb){
    this.emitter.once(event, cb)
  }
  // 获取集合
  col(colName, dbName = this.conf.dbName){
    return this.client.db(dbName).collection(colName)
  }
}
module.exports =  new MongoDB(conf)