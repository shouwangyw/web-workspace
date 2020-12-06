// buffer：八位字节组成数组，可以有效的在js中存储二进制数据
// 创建
const buf1 = Buffer.alloc(10); // 内存分配，一旦分配长度不可变，超出部分截断
console.log(buf1)
// <Buffer 00 00 00 00 00 00 00 00 00 00>

// 从数据创建
let buf2 = Buffer.from([1, 2, 10])
console.log(buf2)
// <Buffer 01 02 0a>
buf2 = Buffer.from([1, 'hello', 10])
console.log(buf2)
// <Buffer 01 00 0a>  // 存放不下，则是00

const buf3 = Buffer.from('hell, 开课吧')
// const buf3 = Buffer.from('hell, 开课吧', 'utf8') // 默认utf8
console.log(buf3);
// <Buffer 68 65 6c 6c 2c 20 e5 bc 80 e8 af be e5 90 a7>

// 写入
buf1.write('hello')
console.log(buf1) 
// <Buffer 68 65 6c 6c 6f 00 00 00 00 00>
buf1.write('hello, kaikeba lalalalalalala')
console.log(buf1) 
// <Buffer 68 65 6c 6c 6f 2c 20 6b 61 69> 

// 读取
console.log(buf1.toString()) 
// hello, kai
console.log(buf3.toString('ascii')) 
// 乱码 hell, e<h/>e'

// 合并
const buf4 = Buffer.concat([buf1, buf3])
console.log(buf4.toString());
// hello, kaihell, 开课吧
