const mongo = require('../models/db.js')
const testdata = require('../models/test-data.js')
const express = require('express')
const path = require('path')
const app = express()

app.get('/index', (req, res) => {
  res.sendFile(path.resolve('./index.html'))
})
// 分页查询水果蔬菜数据
app.get('/api/list', async (req, res) => {
  // 分页数据
  const {page, category} = req.query
  // 查询
  try {
    const col = mongo.col('fruits')
    // 构造条件
    const condition = {}
    if(category){
      condition.category = category
    }
    const fruits = await col.find(condition).skip((page-1)*4).limit(4).toArray()
    // 查询总条数
    const total = await col.find(condition).count()
    res.json({code: '0000', data: {fruits, pagination: {total, page}}})
  } catch (error) {
    console.log(error)
  }
})

app.get('/api/category', async (req, res) => {
  const col = mongo.col('fruits')
  const data = await col.distinct('category')
  res.json({code: '0000', data})
})

app.get('/api/search', async (req, res) => {
  const {keyword} = req.query
  const col = mongo.col('fruits')
  const data = await col.find({
    name: {$regex: new RegExp(keyword)}
  }).toArray()
  res.json({code: '0000', data})
})
app.listen(3000)