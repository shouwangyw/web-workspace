// import React from 'react'
import React, {Component} from './kreact'
// import ReactDOM from 'react-dom'
import ReactDOM from './kreact-dom'

function CompFunc(props){
  return <h2>function组件 hi, {props.name}</h2>
}
class CompClass extends Component {
  render() {
    return <h2>class组件</h2>
  }
}
const users = [
  {id: 1, name: 'jerry'},
  {id: 2, name: 'tom'}
];

const jsx = (
  <div id="demo" style="color: red" className="box">
    <span>hi</span>
    <CompFunc name="kaikeba"></CompFunc>
    <CompClass></CompClass>
    <ul>
      {users.map(u => (<li key={u.id}>{u.name}</li>))}
    </ul>
  </div>
)
console.log(jsx)
// ReactDOM.render(<h2>React 原理</h2>, document.querySelector('#root'))
ReactDOM.render(jsx, document.querySelector('#root'))


