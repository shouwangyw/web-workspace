const http = require('http')
const url = require('url')

// 实现一个路由器
let routes = []

class Applicatin {
  get(path, handler) {
    routes.push({
      path,
      method: 'get',
      handler
    })
  }
  listen(){
    // 创建一个Server
    http.createServer((req, res) => {
      let {pathname} = url.parse(req.url, true)
      for(const route of routes){
        if(route.path === pathname){
          route.handler(req, res)
          return;
        }
      }
    }).listen(...arguments)
  }
}

module.exports = function(config){
  return new Applicatin()
}