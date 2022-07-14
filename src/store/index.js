import Vue from 'vue'
import Vuex from 'vuex'
//* 导入登录模块
import login from '@/store/modules/login'
//* 导入用户数据模块
import user from '@/store/modules/user'
//* 本地持久化的模块
import VuexPersistence from 'vuex-persist'
const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  key: 'usertoken'
})
Vue.use(Vuex)
// * 我们要用模块化的思想去使用vuex，将登录，用户等区分模块
//* 实现一个独立的管理空间
// * 我们将其它的模块导入，注册使用，在创建一个快捷访问
// * 快捷访问是处理子模块的变量，子模块的mutations，actions是不要的，还是用调用全局的方法
export default new Vuex.Store({
  getters: { //* 创建快捷访问方式
    token: state => state.login.token,
    userlist: state => state.user.userlist,
    breadcrumb: state => state.user.breadcrumb
  },
  modules: { //* 注册状态管理模块
    login,
    user
  },
  plugins: [vuexLocal.plugin]
})
