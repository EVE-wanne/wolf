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
      { path: 'addgoods', component: () => import('@/views/Goods/addgoods.vue') },
      { path: 'params', component: () => import('@/views/Goods/classify.vue') },
      { path: 'categories', component: () => import('@/views/Goods/goodsCategory.vue') }

    ]
  }

]

const router = new VueRouter({
  routes
})

// router.beforeEach((to, from, next) => {
//   const tk = local.get('tk')
//   if (to.path == '/login') { // 只要访问了登录都应该放行
//     next()
//   } else if (tk) {
//     // 只要有token说明登录成功，都应该放行
//     next()
//   } else if (!tk) {
//     // token不存在应该退回到登录页面
//     router.push('/login')
//   }
// })
export default router
