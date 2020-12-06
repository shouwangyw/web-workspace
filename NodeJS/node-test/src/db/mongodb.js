// 连接mongodb
const MongoClient = require('mongodb').MongoClient
// 连接URL
const url = 'mongodb://127.0.0.1:27017'
// 数据库名
const dbName = 'kaikeba';
(async function(){
  // 0. 创建客户端
  const client = new MongoClient(url, {useNewUrlParser: true})
  try {
    // 1. 连接数据库（异步）
    await client.connect()
    console.log('Connected Successfully!')
    
    // 2. 获取数据库
    const db = client.db(dbName)

    // 3. 获取集合
    const fruitColl = db.collection('fruits')
    
    // 4. 插入文档
    let r;
    r = await fruitColl.insertOne({name: '芒果', price: 20.0})
    console.log('插入成功', r.result)

    // 5. 查询文档
    r = await fruitColl.findOne()
    console.log('查询结果', r)

    // 6. 更新文档
    r = await fruitColl.updateOne({name: '芒果'}, {$set: {name: '苹果'}})
    console.log('更新成功', r.result)

    // // 7. 删除文档
    // r = await fruitColl.deleteOne({name: '苹果'})
    // console.log('删除成功', r.result)

    console.log('*****************操作符的使用****************')
    /**
     * 操作符的使用
     */
    r = await fruitColl.findOne({
        // $or: [{ price: { $gte: 20 } }, { price: { $lte: 10 } }]
        // $and: [{ price: { $gte: 10 } }, { price: { $lte: 20 } }]
        // price:{$gte:10, $lte:20}
      name: { $regex: /果/ }
    });
    console.log("查询结果\n", JSON.stringify(r, null, 2));
    
    // 创建 stations 集合
    const stations = db.collection('stations')
    // // 添加测试数据，执行一次即可
    // await stations.insertMany([
    //   { name: "天安门东", loc: [116.407851, 39.91408] },
    //   { name: "天安门西", loc: [116.398056, 39.913723] },
    //   { name: "王府井", loc: [116.417809, 39.91435] }
    // ]);

    // 创建索引
    await stations.createIndex({ loc: "2dsphere" });
    // 查询方圆1公里以内的地铁站
    r = await stations
      .find({
        loc: {
          $nearSphere: {
            $geometry: {
              type: "Point",
              coordinates: [116.403847, 39.915526]
            },
            $maxDistance: 1000
          }
        }
      })
      .toArray();
    console.log("天安门附近地铁站：\n", JSON.stringify(r, null, 2));
  } catch (error) {
    console.log(error)
  }
  client.close()
})()