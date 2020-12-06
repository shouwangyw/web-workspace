// 认证用户
module.exports = async (ctx, next) => {
  if(!ctx.session.userinfo) {
    // 未登陆
    // ctx.status = 401
    ctx.body = {code: '0002', message: 'User not logged in'}
  }else{
    await next()
  }
}