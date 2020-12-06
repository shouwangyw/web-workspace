import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import Lifecycle from './Lifecycle'
import CartSample from './CartSample'
import CommentList from './components/CommentList'
import Composition from './components/Composition'
import Hoc from './components/Hoc2'
import ContextSample from './components/ContextSample'
import AntdTest from './components/AntdTest'
import KFormSample from './components/KFormSample'
import ReduxTest from './components/ReduxTest'
import RouteSample from './components/RouteSample'
import RouteSample2 from './components/RouteSample2'

// ReactDOM.render(<h1>React 真酷</h1>, document.querySelector('#root'));
// ReactDOM.render(<App/>, document.querySelector('#root'));
// ReactDOM.render(<Lifecycle/>, document.querySelector('#root'));
// ReactDOM.render(<CartSample title="React购物车"/>, document.querySelector('#root'));
// ReactDOM.render(<CommentList/>, document.querySelector('#root'));
// ReactDOM.render(<Composition/>, document.querySelector('#root'));
// ReactDOM.render(<Hoc stage="React"/>, document.querySelector('#root'));
// ReactDOM.render(<ContextSample/>, document.querySelector('#root'));
// ReactDOM.render(<AntdTest/>, document.querySelector('#root'));
// ReactDOM.render(<KFormSample/>, document.querySelector('#root'));
// ReactDOM.render(<ReduxTest/>, document.querySelector('#root'));
// ReactDOM.render(<RouteSample/>, document.querySelector('#root'));
ReactDOM.render(<RouteSample2/>, document.querySelector('#root'));

// // 动态渲染
// function tick() {
//   ReactDOM.render(<h2>{new Date().toLocaleTimeString()}</h2>, document.querySelector('#root'));
// }
// setInterval(tick, 1000);

// import store from './store/index'
// // function render() {
// //   ReactDOM.render(<ReduxTest/>, document.querySelector('#root'));
// // }
// // render();
// // store.subscribe(render)

// import {Provider} from 'react-redux'
// function render() {
//   ReactDOM.render((
//     <Provider store={store}>
//       <ReduxTest/>
//     </Provider>
//   ), document.querySelector('#root'));
// }
// render();