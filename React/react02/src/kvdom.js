// 转换 vdom 为 dom
export function initVNode(vnode){
  // vnode是一颗虚拟DOM树
  const {vtype} = vnode
  if(!vtype){
    // 文本节点，TextNode
    return document.createTextNode(vnode);
  }
  if(vtype === 1){
    // 原生节点
    return createElement(vnode);
  }else if(vtype === 2) {
    // class 组件
    return createClassComp(vnode);
  }else{
    return createFunctionComp(vnode);
  }

}
function createElement(vnode){
  const {type, props} = vnode;
  const node = document.createElement(type);
  // 属性处理
  const {key, children, ...rest} = props;
  Object.keys(rest).forEach(attr => {
    // 特殊处理的属性：htmlFor，className
    if(attr === 'className'){
      node.setAttribute('class', rest[attr])
    }else{
      node.setAttribute(attr, rest[attr])
    }
  });
  // 递归处理可能存在的子元素
  children.forEach(c => {
    // c 如果是数组
    if(Array.isArray(c)){
      c.forEach(n => {
        node.appendChild(initVNode(n))
      });
    }else{
      node.appendChild(initVNode(c))
    }
  });
  return node;
}
function createClassComp(vnode){
  const {type, props} = vnode;
  console.log(type)
  const component = new type(props);
  // 执行 class 组件的render方法得到vdom
  const vdom = component.render();
  return initVNode(vdom)
}
function createFunctionComp(vnode){
  const {type, props} = vnode;
  // type 是函数组件，它执行直接返回vdom
  const vdom = type(props);
  return initVNode(vdom)
}

// vdom diff

export function createVNode(vtype, type, props){
  // 传递的类型有三种：1-原生标签，2-函数式组件，3-class组件
  // 使用 vtype 属性表示元素类型
  const vnode = {
    vtype, type, props
  }
  return vnode
}