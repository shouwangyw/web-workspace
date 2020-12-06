class KVuex {
  constructor(options){
    this.state = options.state;
    this.mutations = options.mutations;
    this.actions = options.actions;
    // 借用Vue本身的响应式的通知机制
    // state 会将需要的依赖收集在 Dep 中
    this.$vm = new KVue({
      data: {
        $state: this.state
      }
    });
  }
  commit(type, payload, options){
    const entry = this.mutations[type];
    entry.forEach(handler => {
      handler(payload);
    });
  }
  dispatch(type, payload){
    const entry = this.actions[type];
    return entry(payload);
  }
}