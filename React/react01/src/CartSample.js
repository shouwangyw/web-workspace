import React, { Component } from 'react'

// 购物车组件 ： 函数型组件
function Cart(props){
  return (
    <table>
      <tbody>
        {props.data.map(d => (
          <tr key={d.id}>
            <td>{d.text}</td>
            <td>
            <button onClick={() => props.descCount(d)}>-</button>
            {d.count}
            <button onClick={() => props.incrCount(d)}>+</button>
            </td>
            <td>￥{d.price * d.count}</td>
            <td></td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
export default class CartSample extends Component {
  constructor(props){
    super(props);
    this.state = {
      goods: [
        {id: 1, text: 'Web全栈架构师', price: 666},
        {id: 2, text: 'React', price: 888},
        {id: 3, text: 'Vue', price: 888}
      ],
      inputText: '', //  输入的商品名
      cart: []
    }
    // // 回调的写法1
    // this.addGood = this.addGood.bind(this);
  }
  // addGood(){
  //   // TODO
  // }
  // 回调的写法2
  addGood = () => {
    this.setState(prevState => ({
      goods: [...prevState.goods, {id: 4, text: prevState.inputText, price: 999}]
    }));
  }
  textChangeHandle = (ev) => {
    this.setState({
      inputText: ev.target.value
    });
  }
  addToCart(good){
    const newCart = [...this.state.cart];
    const idx = newCart.findIndex(c => c.text === good.text);
    const item = newCart[idx];
    if(item){
      newCart.splice(idx, 1, {...item, count: item.count+1});
    } else {
      newCart.push({...good, count: 1});
    }
    this.setState({cart: newCart});
  }
  incrCount = (item) => {
    const newCart = [...this.state.cart];
    const idx = newCart.findIndex(c => c.text === item.text);
    newCart.splice(idx, 1, {...item, count: item.count+1});
    this.setState({cart: newCart});
  }
  descCount = (item) => {
    const newCart = [...this.state.cart];
    const idx = newCart.findIndex(c => c.text === item.text);
    // newCart.splice(idx, 1, {...item, count: item.count-1});
    if(item.count === 1){
      newCart.splice(idx);
    }else{
      newCart.splice(idx, 1, {...item, count: item.count-1});
    }
    this.setState({cart: newCart});
  }
  render() {
    const title = this.props.title ? <h1>{this.props.title}</h1> : null;
    // 循环：将js对象数组转换为jsx数组
    const goods = this.state.goods.map(good => (
      <li key={good.id}>{good.text}
        <button onClick={() => this.addToCart(good)}>加购</button>
      </li>
    ));
    return (
      <div>
        {/* 条件语句 */}
        {/* {this.props.title && <h1>{this.props.title}</h1>} */}
        {title}

        {/* 添加商品 */}
        <div>
          <input type="text" value={this.state.inputText} onChange={(e) => this.textChangeHandle(e)}/>
          <button onClick={this.addGood}>添加商品</button>          
        </div>

        {/* 列表渲染 */}
        <ul>{goods}</ul>

        {/* 购物车组件 */}
        <Cart data={this.state.cart} incrCount={this.incrCount} descCount={this.descCount}/>
      </div>
    )
  }
}
