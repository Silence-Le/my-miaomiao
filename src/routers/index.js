import Vue from 'vue'
import Router from 'vue-router'

//这里是一级路由，分别指向三个页面，导入views下面的页面的路由

import movieRouter from './movie'/*./movie是指router下面的二级路由引入的三个大的页面*/
import mineRouter from './mine'
import cinemaRouter from './cinema'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,  /*基础的路由根路径*/

  routes: [
    movieRouter,/*这三个是一级路由，二级路由分别在他们里面做，用children来配置*/
    mineRouter,
    cinemaRouter,
    {
      path:'/', redirect: '/movie' /*路由重定向*/
    }
    // {
    //   path: '/',
    //   name: 'home',
    //   component: Home
    // },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }

  ]
})
