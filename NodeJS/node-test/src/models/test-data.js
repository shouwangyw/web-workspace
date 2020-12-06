const mongodb = require('./db')

mongodb.once('connect', async () => {
  const col = mongodb.col('fruits')
  try {
    // 删除已存在的数据
    await col.deleteMany();
    // 插入测试数据
    await col.insertMany([
      {name: '苹果', price: 9.9, category: '水果'},
      {name: '香蕉', price: 5.9, category: '水果'},
      {name: '芒果', price: 11.9, category: '水果'},
      {name: '砂糖橘', price: 12, category: '水果'},
      {name: '土豆', price: 3.5, category: '蔬菜', stack: 100},
      {name: '西红柿', price: 2.8, category: '蔬菜', stack: 100},
      {name: '茄子', price: 2, category: '蔬菜'},
      {name: '韭菜', price: 1.5, category: '蔬菜'}
    ])
    console.log('测试数据插入成功')
  } catch (error) {
    console.log('测试数据插入失败', error)
  }
})
