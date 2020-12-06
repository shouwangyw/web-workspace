const Sequelize = require('sequelize')

// 建立连接
const sequelize = new Sequelize('yw_test_db', 'root', 'zte@123456', {
  host: '10.5.5.181',
  dialect: 'mysql', // 方言，mysql\postgre\sql server\sql lite ...
  operatorsAliases: false
})

// // 定义模型 Model - Table
// const Fruit = sequelize.define('Fruit', {
//   // 定义属性的一部分
//   name: {
//     type: Sequelize.STRING(20), 
//     allowNull: false,
//     get(){
//       const fname = this.getDataValue('name')
//       const price = this.getDataValue('price')
//       const stock = this.getDataValue('stock')
//       return `${fname}(价格：￥${price} 库存：${stock}kg)`
//     }
//   },
//   price: {
//     type: Sequelize.FLOAT,
//     allowNull: false,
//     validate: {
//       isFloat: {msg: '价格字段请输入数字'},
//       min: {args: [0], msg: '价格字段必须大于0'}
//     }
//   },
//   stock: {
//     type: Sequelize.INTEGER, 
//     defaultValue: 0,
//     validate: {
//       isNumeric: {msg: '库存字段请输入数字'}
//     }
//   }
// },{
//   // 定义模型选项
//   timestamps: false,
//   freezTableName: true,
//   getterMethods: {
//     amount(){
//       return this.getDataValue('stock') + 'kg'
//     }
//   },
//   setterMethods: {
//     amount(val){
//       const idx = val.indexOf('kg')
//       const v = val.slice(0, idx)
//       this.setDataValue('stock', v)
//     }
//   }
// })

// // 同步数据库，force：true则会删除已存在表
// Fruit.sync({force: true}).then(() => {
//   // 添加测试数据
//   // return Fruit.create({name: '香蕉', price: 3.5})
//   // 批量添加
//   return Fruit.bulkCreate([
//     {name: '香蕉', price: 5.5}, 
//     {name: '芒果', price: 9.0},
//     {name: '菠萝', price: 5.0}
//   ])
// }).then(() => {
//   // 查询
//   // 通过模型实例触发setterMethods
//   Fruit.findAll().then(fruits => {
//     console.log('findAll\n', JSON.stringify(fruits, null, 2));    
//     // 修改 amount，触发 setterMethods
//     fruits.forEach(fruit => {
//       fruit.amount = '150kg'
//       fruit.save()
//       // 使用实例方法
//       console.log(`买5kg${fruit.name}需要￥${fruit.totalPrice(5)}`);
//     })
//   })

//   // // 通过id查询
//   // Fruit.findById(1).then(fruit => {
//   //   // fruit是一个Fruit实例，若没有则为null
//   //   console.log('findById', fruit.get());  
//   // })
//   // 条件查询
//   Fruit.findOne({where: {name: '香蕉'}}).then(fruit => {
//     // fruit是首个匹配项，若没有则为null
//     console.log('条件查询 findOne\n', fruit.get());
//   })
//   // 获取数据和总条数
//   Fruit.findAndCountAll().then(result => {
//     console.log(result.count);
//     console.log(result.rows.length)
//   })
//   // 查询操作符
//   const op = Sequelize.Op
//   Fruit.findAll({
//     where: {price: {[op.lt]:6, [op.gte]:2}}
//   }).then(fruits => {
//     console.log('查询操作符\n', JSON.stringify(fruits, null, 2))
//   })
//   // 或语句
//   Fruit.findAll({
//     // where: {[op.or]:[{price: {[op.lt]:4}}, {stock: {[op.gte]: 100}}]}
//     where: {price: {[op.or]: [{[op.gt]: 8}, {[op.lt]: 5}]}}
//   }).then(fruits => {
//     console.log('或语句\n', JSON.stringify(fruits, null, 2))
//   })
//   // 分页
//   Fruit.findAll({offset: 0, limit: 2}).then(fruits => {
//     console.log('分页\n', JSON.stringify(fruits, null, 2))
//   })
//   // 排序
//   Fruit.findAll({order: [['price', 'DESC']]}).then(fruits => {
//     console.log('排序\n', JSON.stringify(fruits, null, 2))
//   })
//   // 聚合
//   setTimeout(() => {
//     Fruit.max('price').then(max => {
//       console.log('聚合函数 max', max)
//     })
//     Fruit.sum('price').then(sum => {
//       console.log('聚合函数 sum', sum)
//     })
//   }, 500)

//   // 更新
//   Fruit.update({price: 6}, {where: {name: '香蕉'}}).then(result => {
//     console.log('更新 update', result)
//   })

//   // 删除
//   Fruit.destroy({where: {id: 2}}).then(result => {
//     console.log('删除 destroy', result)
//   })
// }).catch(err => {
//   console.log(err.message);
// })

// // 添加类级别方法
// Fruit.classify = function(name) {
//   const tropicFruits = ['香蕉', '芒果', '椰子'] // 热带水果
//   return tropicFruits.includes(name) ? '热带水果' : '其他水果'
// }
// // 添加实例级别方法
// Fruit.prototype.totalPrice = function(count){
//   return (this.price * count).toFixed(2)
// }
// // 使用类方法
// const fruitArr = ['香蕉', '草莓']
// fruitArr.forEach(f => console.log(f+'是'+Fruit.classify(f)))

/**
 * 关联
 */
// 一对多、多对一
const Player = sequelize.define('player', {
  name: Sequelize.STRING
})
const Team = sequelize.define('team', {
  name: Sequelize.STRING
})
// 建立关系
Player.belongsTo(Team)  // 这里会添加 teamId 到 player 表作为外键
Team.hasMany(Player)
// 同步
sequelize.sync({force: true}).then(async () => {
  await Team.create({name: '火箭'})
  await Player.bulkCreate([{name: '哈登', teamId: 1}, {name: '保罗', teamId: 1}])
  
  // 一对多查询
  const team = await Team.findOne({where: {name: '火箭'}, includes: [Player]})
  console.log('关联查询 一对多', JSON.stringify(team, null, '\t'))
  // 多对一查询
  const players = await Player.findAll({includes: [Team]})
  console.log('关联查询 多对一', JSON.stringify(players, null, 2))
})

// // 多对多
// const Fruit = sequelize.define('fruit', {name: Sequelize.STRING})
// const Category = sequelize.define('category', {name: Sequelize.STRING})
// Fruit.FruitCategory = Fruit.belongsToMany(Category, {
//   through: 'FruitCategory'
// })
// sequelize.sync({force: true}).then(async () => {
//   // 插入测试数据
//   await Fruit.create(
//     {name: '香蕉', categories: [{id: 1, name: '热带'}, {id: 2, name: '温带'}]},
//     {include: [Fruit.FruitCategory]}
//   )
//   // 多对多联合查询
//   const fruit = await Fruit.findOne({
//     where: {name: '香蕉'},  
//     // 通过 through 指定条件、字段等
//     include: [{model: Category, through: {attributes: ['id', 'name']}}]
//   })
//   console.log('多对多关联查询\n', JSON.stringify(fruit, null, 2))
// })
