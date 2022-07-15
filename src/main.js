import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//* 基础样式
import '@/styles/reset.less'
// * element ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import moment from 'moment'
// 定义一个全局过滤器实现日期格式化
Vue.filter('datefmt', function (input) { // 当input为时间戳时，需转为Number类型
  // 使用momentjs这个日期格式化类库实现日期的格式化功能
  return moment(input).format('YYYY-MM-DD HH:mm:ss')
})
Vue.use(ElementUI)
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
