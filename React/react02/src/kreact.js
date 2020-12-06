import {createVNode} from './kvdom'

function createElement(type, props, ...children){
  // console.log(arguments)
  // 传递的类型有三种：1-原生标签，2-函数式组件，3-class组件
  // 使用 vtype 属性表示元素类型
  props.children = children
  console.log({type, props})
  delete props.__source
  delete props.__self

  // 判断组件类型
  let vtype;
  if(typeof type === 'string'){
    // 原生标签，div、span、...
    vtype = 1;
  }else if(typeof type === 'function'){
    if(type.isClassComponent){
      // 类组件
      vtype = 2;
    } else{
      // 函数组件
      vtype = 3;
    }
  }

  return createVNode(vtype, type, props)
}

// 实现Component
export class Component {
  // 区分function和class组件
  static isClassComponent = true;

  constructor(props){
    this.props = props;
    this.state = {};
  }
  setState(state){
    // ...
  }

}

export default {
  createElement
}