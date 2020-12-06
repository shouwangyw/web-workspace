const mysql = require('mysql')
// 连接配置
const cfg = {
  host: 'localhost',
  user: 'root',
  password: 'yw@910714',
  database: 'yw_test_db'
}
// 创建连接对象
const conn = mysql.createConnection(cfg)
// 连接数据库
conn.connect(err => {
  if(err){
    throw err
  }
  console.log('Connection Successfully!')
})

// sql语句
const CREATE_TABLE = `
  create table if not exists test (
    id int not null auto_increment,
    message varchar(45) null,
    primary key(id)
  )
`
const INSERT_SQL = `insert into test(message) values(?)`
const SELECT_SQL = `select * from test`

// // 查询 conn.query()
conn.query(CREATE_TABLE, err => {
  if(err){
    throw err
  }
//   // 插入数据
//   conn.query(INSERT_SQL, 'hello, mysql', (err, result) => {
//     if(err){
//       throw err
//     }
//     console.log(result)
//     conn.query(SELECT_SQL, (err, results) => {
//       console.log(results)
//       conn.end()  // 若query语句有嵌套，则end需要在此执行
//     })
//   })

  const sql = mysql.format(INSERT_SQL, 'hello')
  console.log(sql);
})

// Promise封装
function query(conn, sql, params=null) {
  return new Promise((resolve, reject) => {
    conn.query(sql, params, (err, results) => {
      if(err) {
        reject(err)
      }else{
        resolve(results)
      }
    })
  })
}
conn.query(CREATE_TABLE, err => {
  if(err){
    throw err
  }
  // // 插入数据
  // conn.query(INSERT_SQL, 'hello, mysql', (err, result) => {
  //   if(err){
  //     throw err
  //   }
  //   console.log(result)
  //   // 查询数据
  //   conn.query(SELECT_SQL, (err, results) => {
  //     console.log(results)
  //     conn.end()  // 若query语句有嵌套，则end需要在此执行
  //   })
  // })

  query(conn, SELECT_SQL)
    .then(results => console.log(results))
    .catch(err => console.log(err))
})