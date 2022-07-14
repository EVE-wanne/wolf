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
      { path: 'users', component: () => import('@/views/User') },
      { path: 'roles', component: () => import('@/views/Roles/userlist.vue') },
      { path: 'rights', component: () => import('@/views/Roles/roleslist.vue') },
      { path: 'goods', component: () => import('@/views/Goods/goodlist.vue') },
      { path: 'addgoods', component: () => import('@/views/Goods/addgoods.vue') }

    ]
  }

]

const router = new VueRouter({
  routes
})

export default router
