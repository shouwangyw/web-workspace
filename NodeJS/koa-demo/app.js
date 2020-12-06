const Koa = require('koa')
const app = new Koa()
const session = require('koa-session')
const redisStore = require('koa-redis') // 整合redis和session
const redis = require('redis')  // 操作redis
const bodyparser = require('koa-bodyparser')
const client = redis.createClient(6379, '127.0.0.1')  // 获取操作客户端
// 数据库连接
const mongoose = require('./db/mongoose')
const model = require('./models/vip')

// keys的作用：来用来对cookie进行签名
app.keys = ['some secret', 'another secret']

// 引入模板引擎
const hbs = require('koa-hbs')
const helpers = require('./utils/helpers')

app.use(hbs.middleware({
  // 视图根目录
  viewPath: __dirname + '/views',  
  // 默认布局页面
  defaultLayout: 'layout',
  // 注册 partial 目录（可复用的页面）
  partialsPath: __dirname + '/views/partials',
  // 开发阶段不缓存
  disableCache: true
}))

// 错误处理中间件(写在最上面)
app.use(async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    // 响应用户
    ctx.status = error.statusCode || error.status || 500
    // 给用户响应信息
    ctx.body = error.message
    // 触发应用层级错误事件
    ctx.app.emit('error', error, ctx)
    console.log('捕获到错误：', error.message)
  }
})

// 返回静态文件服务中间件应该放在错误处理之后，用户请求处理之前
const static = require('koa-static')
app.use(static(__dirname + '/public'))

// 注册bodyparser
app.use(bodyparser())

// session 中间件
// 静态文件服务的后面，自定义中间件的前面
// session的配置
const SESS_CONFIG = {
  key: 'kkb:sess',		// 设置cookie中的key名字
  maxAge: 86400000,		// 有效期：默认一天
  httpOnly: true,		// 仅服务器端修改
  signed: true,			// 签名cookie
  store: redisStore({client}) // 使用redis存储session数据
}
app.use(session(SESS_CONFIG, app))
// app.use(ctx => {
//   if(ctx.path === '/favicon.ico') return
//   let n = ctx.session.count || 0
//   ctx.session.count = ++n
//   ctx.body = '第' + n + '次访问'
//   // 查询redis的数据
//   client.keys('*', (err, keys) => {
//     console.log(keys)
//     keys.forEach(key => {
//       client.get(key, (err, val) => {
//         console.log(val)
//       })
//     })
//   })
// })

// Vip课程查询中间件
app.use(require('./middleware/get-vip'))

// 中间件是一个异步函数，对用户请求和响应做预处理
app.use(async (ctx, next) => {
  // next上面：请求操作
  
  await next()  // 分界线
  // next下面：响应操作

  // 获取响应头，印证执行顺序
  const rt = ctx.response.get('X-Response-Time')
  console.log(`输出计时：${ctx.method} ${ctx.url} - ${rt}`)
})

// 响应时间统计中间件
app.use(async (ctx, next) => {
  const start = Date.now()
  console.log('开始计时')
  await next()
  const ms = Date.now() - start
  ctx.set('X-Response-Time', `${ms}ms`)
  console.log('计时结束')
})

// // 触发错误
// app.use(async (ctx, next) => {
//   // throw new Error('未知错误')
//   ctx.throw(401, '认证失败')
// })

// // 响应用户请求
// app.use(ctx => {
//   console.log('响应用户请求')
//   // 设置响应状态码
//   ctx.status = 200 
//   // 设置响应类型，等效于 ctx.set('Content-Type', 'text/html')
//   ctx.type = 'html'
//   // 设置响应体
//   ctx.body = '<h1>Hello Koa</h1>' 
// })

// 导入路由文件
const index = require('./routes/index')
const users = require('./routes/users')
// 写在通用中间件的后面
app.use(index.routes())
app.use(users.routes())

// 全局错误事件(写在最后面,不是必须)
app.on('error', err => {
  console.error('全局错误处理：', err.message)
})

// 开始监听端口，等同于 http.createServer(app.callback()).listen(3000)
app.listen(3000)