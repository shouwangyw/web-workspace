class KVue {
  constructor(options){
    // 保存 options
    this.$options = options;

    // 保存 data 选项
    this.$data = options.data;
    // 执行响应式
    this.observe(this.$data);

    // // Test
    // new Watcher();
    // console.log('模拟compile', this.$data.test);
    this.$compile = new Compile(options.el, this);
  }
  observe(obj){
    if(!obj || typeof obj !== 'object'){
      return;
    }
    // 遍历data选项
    Object.keys(obj).forEach(key => {
      // 为每一个 key 定义响应式
      this.defineReactive(obj, key, obj[key]);
      // 为Vue的data做属性代理
      this.proxyData(key);
    });
  }
  defineReactive(obj, key, val){
    // 递归查找嵌套属性
    this.observe(val);

    // 创建Dep
    const dep = new Dep();

    // 为data对象定义属性
    Object.defineProperty(obj, key, {
      enumerable: true, // 可枚举
      configurable: true, // 可修改或删除
      get(){
        Dep.target && dep.addDep(Dep.target);
        console.log(dep.deps)
        return val;
      },
      set(newVal){
        if(newVal == val){
          return;
        }
        val = newVal;
        // console.log('数据发生变化啦');
        // 在set的时候触发dep的notify来通知所有的Watcher对象更新视图
        dep.notify();
      }
    });
  }
  // 代理 data 选项中的数据
  proxyData(key){
    Object.defineProperty(this, key, {
      get() {
        return this.$data[key];
      },
      set(newVal){
        this.$data[key] = newVal;
      } 
    });
  }
}

// 依赖管理器：负责将视图中所有依赖收集管理，包括依赖添加和通知
class Dep{
  constructor(){
    // deps里面存放的是Watcher的实例
    this.deps = []; 
  }
  // 添加依赖
  addDep(dep){
    this.deps.push(dep);
  }
  // 通知所有 Watcher 执行更新
  notify(){
    this.deps.forEach(dep => {
      dep.update();
    });
  }
}

// Watcher：具体的更新执行者
class Watcher{
  constructor(vm, key, cb){
    this.vm = vm;
    this.key = key;
    this.cb = cb;
    // 将来new一个监听器时，将当前Watcher的实例附加到Dep.target
    Dep.target = this;
    // 读一下，触发get 
    this.vm[this.key];
    Dep.target = null; // 避免重复添加
  }
  // 更新
  update(){
    console.log('视图更新啦');
    this.cb.call(this.vm, this.vm[this.key]);
  }
}