import React from 'react'
import ReactDOM from 'react-dom'

function Comp(props){
  return <h2>hi, {props.name}</h2>
}
const jsx = (
  <div id="demo">
    <span>hi</span>
    <Comp name="kaikeba"></Comp>
  </div>
)
console.log(JSON.stringify(jsx, null, 2))
ReactDOM.render(jsx, document.querySelector('#root'))


