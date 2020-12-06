// 内建模块
const os = require('os')
// 第三方模块
const cpuStat = require('cpu-stat')

function showStatistics(){
    const memory = os.freemem() / os.totalmem() * 100
    console.log(`内存占用率：${memory}%`);
    
    cpuStat.usagePercent((err, percent) => {
        console.log(`CPU占用率：${percent}%`);
    })
}

// setInterval(showStatistics, 5000);

// 自定义模块
const conf = require('./conf')
console.log(conf)

// const {rmb2dollar} = require('./currency')
// console.log(rmb2dollar(100));

const {rmb2dollar} = require('./currency')(7)
console.log(rmb2dollar(100))
