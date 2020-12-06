const Router = require('koa-router')
const router = new Router({prefix: '/users'})

router.get('/', ctx => {
  ctx.body = 'users list'
})
/***********************用户登陆鉴权-session方式********************/
router.post('/login', async ctx => {
  // 拿出请求参数
  const body = ctx.request.body
  // 登录逻辑省略
  // ...
  console.log(body)

  // 登录成功
  ctx.session.userinfo = body.username

  ctx.body = {code: '0000', message: 'Login Succussfully', data: ctx.session}
})
router.post('/logout', async ctx => {
  delete ctx.session.userinfo
  ctx.body = {code: '0000', message: 'Logout Successfully', data: ctx.session}
})
// 需要路由守卫
const auth = require('../middleware/auth')
router.get('/getUser', auth, async ctx => {
  ctx.body = {code: '0000', message: 'Get Data Successfully', userinfo: ctx.session.userinfo}
})

/***********************用户登陆鉴权-token方式********************/
// jsonwebtoken令牌生成模块
const jwt = require('jsonwebtoken')
// koa的jwt中间件作用是认证令牌合法性
const jwtAuth = require('koa-jwt')
const secret = 'It is a secret'
router.post('/login-token', async ctx => {
  const {body} = ctx.request
  const userinfo = body.username
  // 省略登陆逻辑
  ctx.body = {
    message: 'Login Successfully',
    user: userinfo,
    // 使用jwt模块签名一个令牌
    token: jwt.sign({
      // 签名只是防篡改
      data: userinfo, //  由于签名不是加密，令牌中不要存放敏感数据
      exp: Math.floor(Date.now()/1000) + 3600 // 过期时间1分钟
    }, secret)
  }
})
router.get('/getUser-token', jwtAuth({
  // 对传入令牌进行校验
  secret
}), async ctx => {
  // 获取session
  ctx.body = {message: 'Get Data Successfully', userinfo: ctx.state.user.data}
})

/***********************用户登陆鉴权-OAuth方式********************/
// 需要去授权方申请开放登录
const config = {
  client_id: '112e12b308aa6edd1d08',
  client_secret: '2d98baa25ab985bcf55382190f15912fdbcae549'
}
const axios = require('axios')
const querystring = require('querystring')
router.get('/login-github', async ctx => {
  // 重定向到认证接口，并配置参数
  const path = `https://github.com/login/oauth/authorize?client_id=${config.client_id}`;
  // 转发到授权服务器
  ctx.redirect(path)
})
router.get('/oauth/github/callback', async ctx => {
  const code = ctx.query.code
  const params = {
    client_id: config.client_id,
    client_secret: config.client_secret,
    code: code
  }
  console.log(params)
  let res = await axios.post('https://github.com/login/oauth/access_token', params)
  console.log(res.data)

  const access_token = querystring.parse(res.data).access_token
  res = await axios.get('https://api.github.com/user?access_token=' + access_token)
  console.log('userAccess：', res.data)
  ctx.redirect('/hello.html')
})

module.exports = router