import {createStore, applyMiddleware, combineReducers} from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
// import counterReducer from './counter.redux'
import counter from './counter.redux'
import user from './user.redux'
import createSagaMiddleware from 'redux-saga'
import saga from './sagas'

// 1.创建中间件
const mid = createSagaMiddleware();
// 2.应用中间件
const store = createStore(
  // reducer模块化
  combineReducers({counter, user}), 
  // applyMiddleware(logger, thunk)
  applyMiddleware(logger, mid)
);
// 3.run
mid.run(saga);
// 4.导出
export default store;