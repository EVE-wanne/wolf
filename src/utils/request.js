import axios from 'axios'
//* 导入vuex模块
import store from '@/store'

import { Message } from 'element-ui'

const request = axios.create({
  baseURL: 'http://liufusong.top:8899/api/private/v1/'
  // timeout: 8000
})

// 添加请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  //* 发送前判断本地存储中有没有存储token数据，有的话我们就直接将其添加在请求头里
  if (store.getters.token) {
    //* 快捷访问中，如果有token，我们就添加到请求头中
    config.headers.Authorization = store.getters.token
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  //* 抛出异常
  return Promise.reject(error)
})

// 添加响应拦截器
request.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  //* 我们可以对数据进行解构
  const { meta, data } = response.data
  if (meta.status === 200 || meta.status === 201) {
    // console.log(111)
    Message.success(meta.msg)
    return data
  } else {
    //* 其它都是抛出异常
    //* 如果异常信息是token异常，我们需要将本地的token清除
    if (meta.msg === '无效token') {
      store.commit('login/deltoken')
    }
    // console.log(222)
    Message.error(meta.msg) // 提示错误消息
    return Promise.reject(new Error(meta.msg))
  }
  // return response
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})
export default request
