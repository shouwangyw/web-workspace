import {createStore, applyMiddleware} from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

// reducer：具体状态修改执行者
const counterReducer = (state = 0, action) => {
  switch(action.type){
    case 'incr': 
      return state + 1;
    case 'decr': 
      return state - 1;
    default: 
      return state;
  }
}
export default createStore(counterReducer, applyMiddleware(logger, thunk));