import Vue from 'vue'
import VueRouter from 'vue-router'
import pathArr from './pathArr'
//导入需要的组件
import Login from '@/components/MyLogin.vue'
import Home from '@/components/MyHome.vue'
//导入对应的组件
import Users from '@/components/menus/MyUsers.vue'
import Rights from '@/components/menus/MyRights.vue'
import Goods from '@/components/menus/MyGoods.vue'
import Orders from '@/components/menus/MyOrders.vue'
import Settings from '@/components/menus/MySettings.vue'
//用户详情页与用户管理界面平级
import UserDetail from '@/components/user/MyUserDetail.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    //当首页是空白的时候，重定向redirect到登录界面
    { path: '/', redirect: '/login' },
    //登录的路由规则
    { path: '/login', component: Login },
    //首页的左侧边栏需要嵌套子路由
    { 
      path: '/home', 
      component: Home, 
      redirect: '/home/users', 
      children: [
      { path: 'users', component: Users },
      { path: 'rights', component: Rights },
      { path: 'goods', component: Goods },
      { path: 'orders', component: Orders },
      { path: 'settings',component: Settings },
      //用户详情页的路由规则
      { path: 'userinfo/:id', component: UserDetail, props: true }
    ] }
  ]
})
//全局前置守卫
router.beforeEach(function (to, from, next) {
//判断是否访问首页，是访问首页需要判断，不需要则放行
  if(pathArr.indexOf(to.path) !== -1){
    //拿到token
    const token = localStorage.getItem('token')
    //如果token为真，放行，不为真，跳转到登录界面
    if(token){
      next()
    }else {
      next('/login')
    } 
  }else {
    next ()
  }
})

export default router