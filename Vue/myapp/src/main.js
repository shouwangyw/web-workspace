// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App'
import router from './router'

// elementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI);
// API接口
import api from './api'
Object.defineProperty(Vue.prototype, 'Api', { value: api });

Vue.config.productionTip = false;
new Vue({
  el: document.getElementById('app'),
  router,
  template: '<App/>',
  components: { App }
});
