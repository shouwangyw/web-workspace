import React, { Component } from 'react'
import logo from './logo.png'
import './App.css'
import {Button} from 'antd' // 具名导入
// import Button from 'antd/lib/button'
// import 'antd/dist/antd.css'

// 函数型组件传递props
function Welcome1(props){
  return (
    <div>
      Hello, {props.name}
    </div>
  )
}

export default class App extends Component {
  // 1. 当需要状态时，需要构造函数
  constructor(props){
    super(props);
    // 2. 初始化状态
    this.state = {
      count: 0,
      date: new Date()
    }
  }

  // 生命周期函数
  componentDidMount(){ // 组件挂载后
    this.timer = setInterval(() => {
      // 3. 更新状态
      this.setState({
        date: new Date(),
        count: this.state.count + 1
      });
      // console.log(this.state.count);
      
      // 注意事项：
      // 1. 不能直接改状态，如this.state.date = new Date(); // 错误
      // 2. setState()是异步的
    }, 1000);

    // this.setState({
    //   count: this.state.count + 1
    // }, () => {
    //   console.log(this.state.count);
    // });
    // console.log(this.state.count);

    this.setState((prevState, prevProps) => 
    // {
    //   return {
    //     count: prevState.count + 1
    //   }
    // }
    ({
      count: prevState.count + 1
    })
    , () => {
      console.log(this.state.count);
    });
  }
  componentWillUnmount(){ // 组件将要卸载时
    clearInterval(this.timer);
  }

  formatName(user) {
    return user.firstName + ' ' + user.lastName;
  }
  render() {
    const name = 'jerry';
    // jsx 本身也是表达式
    const jsx = <p>hello, react</p>
    return (
      <div>
        App组件
        {/* 表达式 */}
        <h1>{name}</h1>
        <p>{this.formatName({firstName: 'tom', lastName: 'jerry'})}</p>
        {/* 属性 */}
        <img src={logo} style={{width: 100}} className="img"/>
        {/* jsx也是表达式 */}
        {jsx}

        {/* 组件属性传值：传入属性是只读的 */}
        <Welcome1 name="tom"></Welcome1>
        
        {/* 使用状态 */}
        <p>{this.state.date.toLocaleTimeString()}</p>

        {/* antd的试用 */}
        <Button type="primary">button</Button>
      </div>
    )
  }
}
