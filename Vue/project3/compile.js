// 扫描模板中所有依赖，创建更新函数和Watcher
class Compile {
  // el: 宿主元素或其他选择器
  // vm: 当前Vue的实例
  constructor(el, vm) {
    this.$vm = vm;
    // 默认是选择器
    this.$el = document.querySelector(el);
    if (this.$el) {
      // 将 DOM 节点转换为Fragmet，提高执行效率
      this.$fragment = this.node2Fragment(this.$el);
      // 执行编译
      this.compile(this.$fragment);
      // 将生成的结果追加之宿主元素
      this.$el.appendChild(this.$fragment);
    }
  }
  node2Fragment(el) {
    // 创建一个新的Fragment
    const fragment = document.createDocumentFragment();
    let child;
    // 将原生节点拷贝至fragment
    while ((child = el.firstChild)) {
      // fragment是移动操作（剪切复制）
      fragment.appendChild(child);
    }
    return fragment;
  }
  // 编译指定片段
  compile(el) {
    let childNodes = el.childNodes;
    Array.from(childNodes).forEach(node => {
      // 判断node类型，做响应处理
      if (this.isElementNode(node)) {
        // 元素节点要识别 k-xx 或 @xx
        this.compileElement(node);
      } else if (
        this.isTextNode(node) &&
        /\{\{(.*)\}\}/.test(node.textContent)
      ) {
        // 文本节点，只关心{{xx}}格式
        this.compileText(node, RegExp.$1); // RegExp.$1：匹配的内容
      }
      // 遍历可能存在的子节点
      if (node.childNodes && node.childNodes.length) {
        this.compile(node); // 递归
      }
    });
  }
  // 编译元素节点
  compileElement(node) {
    console.log("编译元素节点");
    // 例如：<div k-text="test" @click="onClick">
    const attrs = node.attributes;
    Array.from(attrs).forEach(attr => {
      // 规定指令 k-xx，例如k-text="test"
      const attrName = attr.name; // 属性名:k-text
      const exp = attr.value; // 属性值:test
      if (this.isDirective(attrName)) { // 指令
        const dir = attrName.substr(2);
        this[dir] && this[dir](node, this.$vm, exp);
      } else if(this.isEventDirective(attrName)) { // 事件
        // 例如@click="onClick"
        const dir = attrName.substr(1); // click
        this.eventHandler(node, this.$vm, exp, dir);
      }
    });
  }
  // 编译文本节点
  compileText(node, exp) {
    console.log("编译文本节点");
    this.text(node, this.$vm, exp);
  }
  // 处理文本
  text(node, vm, exp){
    this.update(node, vm, exp, 'text');
  }
  // 处理html
  html(node, vm, exp){
    this.update(node, vm, exp, 'html');
  }
  // 处理双向绑定
  model(node, vm, exp){
    this.update(node, vm, exp, 'model');
    let val = vm.exp;
    // 双向绑定还要处理视图对模型的更新
    node.addEventListener('input', e => {
      vm[exp] = e.target.value;
      val = e.target.value;
    });
  }
  // 更新函数
  update(node, vm, exp, type){
    let updateFn = this[type+'Updater'];
    // 一开始立即执行
    updateFn &&　updateFn(node, vm[exp]); // 执行更新，get
    // 发生改变后再执行
    new Watcher(vm, exp, (value) => {
      updateFn &&　updateFn(node, value); // 执行更新
    });
  }
  // 文本更新器
  textUpdater(node, value){
    node.textContent = value;
  }
  // html更新器
  htmlUpdater(node, value){
    node.innerHTML = value;
  }
  // model更新器
  modelUpdater(node, value){
    node.value = value;
  }
  // 事件处理器
  eventHandler(node, vm, exp, dir){
    let fn = vm.$options.methods && vm.$options.methods[exp];
    if(dir && fn){
      node.addEventListener(dir, fn.bind(vm), false);
    }
  }
  isElementNode(node) {
    return node.nodeType == 1; // 元素节点
  }
  isTextNode(node) {
    return node.nodeType == 3; // 文本节点
  }
  isDirective(name){
    return name.indexOf('k-') == 0;
  }
  isEventDirective(name){
    return name.indexOf('@') == 0;
  }
}
