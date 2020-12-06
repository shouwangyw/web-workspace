// fs
const fs = require('fs')
// 读取一个文件
const data = fs.readFileSync('./conf.js')  // 阻塞操作
console.log('readFileSync', data)
// 异步回调方式读取文件
fs.readFile('./conf.js', (err, data) => {
  console.log('readFile', data)
})
console.log('其他操作')

// 解决异步回调效率低的解决方案
// Promise
const {promisify} = require('util')
const readFile = promisify(fs.readFile)
readFile('./conf.js').then(data => {
  console.log('Promise readFile', data)
})

// v10.0
// fs Promises API
const {promises} = require('fs')
promises.readFile('./conf.js').then(data => {
  console.log('Promises API readFile', data)
})

// Generator
function* ascReadFile (){
  yield readFile('./conf.js')
  yield readFile('./currency.js')
}
const gen = ascReadFile()
gen.next().value.then(data => {
  console.log('Generator readFile', data);
  return gen.next().value;    
}).then(data => {
  console.log('Generator readFile', data);
  return gen.next().value;   
});

// async await
async function asyncReadFile(){
  let data1 = await readFile('./conf.js');
  console.log('async await readFile', data1);
  let data2 = await readFile('./currency.js');
  console.log('async await readFile', data2);
}
asyncReadFile();