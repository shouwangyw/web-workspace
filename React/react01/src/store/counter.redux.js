// reducer：具体状态修改执行者
// const counterReducer = (state = 0, action) => {
export default (state = 0, action) => {
  switch(action.type){
    case 'incr': 
      return state + 1;
    case 'decr': 
      return state - 1;
    default: 
      return state;
  }
}
function incr() {
  return {type: 'incr'}
}
function decr() {
  return {type: 'decr'}
} 
function asyncAdd(){
  return (dispatch, getState) => {
    console.log(getState());
    // 模拟异步操作
    setTimeout(() => {
      dispatch({type: 'incr'})
    }, 1000)
  }
} 
export {incr, decr, asyncAdd}