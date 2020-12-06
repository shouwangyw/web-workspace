const mongoose = require('mongoose')

// 1. 连接
mongoose.connect('mongodb://127.0.0.1:27017/test', {useNewUrlParser: true})

const conn = mongoose.connection
conn.on('error', () => {
  console.log('连接数据库失败')
})
conn.once('open', async () => {
  // 2. 定义一个 Schema - Table
  const Schema = mongoose.Schema({
    category: String,
    name: String
  })
  // 3. 编译一个Model，它对应数据库中复数、小写的Collection
  const Model = mongoose.model('fruit', Schema)
  try {
    // 4. 创建，create返回Promise
    let r = await Model.create({
      category: '热带水果',
      name: '苹果',
      price: 5
    })
    console.log('插入数据', r)
    // 5. 查询，find返回Query，它是实现了then和catch，可以当Promise使用
    // 如果需要返回Promise，调用其exec()
    r = await Model.find({name: '苹果'})
    console.log('查询结果', r)
    // 6. 更新
    r = await Model.updateOne({name: '苹果'}, {$set: {name: '芒果'}})
    console.log('更新结果', r)
    // 7. 删除
    r = await Model.deleteOne({name: '苹果'})
    console.log('删除结果', r)
  } catch (error) {
    console.log(error)
  }
})


const blogSchema = mongoose.Schema({
  // 定义校验规则
  title: {type: String, require: [true, '标题为必填项']},
  author: String,
  body: String,
  // 定义对象数组
  comments: [{body: String, data: Date}],
  // 指定默认值
  date: {type: Date, default: Data.now},
  hidden: Boolean,
  // 定义对象
  meta: {
    votes: Number,
    favs: Number
  }
})
// 定义多个索引
blogSchema.index({title: 1, author: 1, date: -1})
const BlogModel = mongoose.model('blog', blogSchema)
const blog = new BlogModel({
  title: 'nodejs持久化',
  author: 'jerry',
  body: '...'
})
const r = await blog.save()
console.log('新增blog', r)
// 定义实例方法
blogSchema.methods.findAuthor = function(){
  return this.model('blog').find({author: this.author}).exec()
}
// 获得模型实例
const BlogModel = mongoose.model('blog', blogSchema)
const blog = new BlogModel({...})
// 调用实例方法
r = await blog.findAuthor()
console.log('findAuthor', r)

// 静态方法
blogSchema.statics.findAuthor = function(author){
  return this.model('blog').find({author}).exec()
}
r = await BlogModel.findAuthor('jerry')
console.log('findAuthor', r)

// 虚拟属性
blogSchema.virtual('commentsCount').get(function(){
  return this.comments.length
})
let r = await blog.findOne({author: 'jerry'})
console.log('blog留言数：', r.commentsCount)