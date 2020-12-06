// exports.rmb2dollar = function (rmb){
//   return rmb/6;
// }
let rate;
function rmb2dollar(rmb){
  return rmb/rate
}
module.exports = function(r){
  rate = r
  return {
    rmb2dollar
  }
}