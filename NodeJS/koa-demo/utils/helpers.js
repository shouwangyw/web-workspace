const hbs = require('koa-hbs')
const moment = require('moment')

// 日期格式化方法
hbs.registerHelper('date', (date, pattern) => {
  try {
    return moment(date).format(pattern)
  } catch (error) {
    return ''
  }
})