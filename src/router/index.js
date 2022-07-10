import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' }, //* 重定向到登录页面
  { path: '/login', component: () => import('@/views/Login') },
  {
    path: '/home',
    component: () => import('@/views/Home'),
    redirect: 'home/first',
    children: [
      { path: 'first', component: () => import('@/views/Home/components/First.vue') },
      { path: 'user', component: () => import('@/views/User') }
    ]
  }

]

const router = new VueRouter({
  routes
})

export default router
