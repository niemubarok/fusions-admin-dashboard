import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home'

const routes = [
  // {
  //   // Document title tag
  //   // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
  //   meta: {
  //     title: 'Dashboard'
  //   },
  //   path: '/',
  //   name: 'home',
  //   component: Home
  // },
  {
    meta:{
      title:'Login',
      formScreen:true
    },
    path:'/',
    name:'login',
    component:()=> import('../views/Login')
  },
  {
    meta: {
      title: 'All User'
    },
    path: '/user/all',
    name: 'user',
    component: () => import(/* webpackChunkName: "user" */ '../views/Users')
  },
  {
    meta: {
      title: 'Restaurant List'
    },
    path: '/restaurant/all',
    name: 'restaurant',
    component: () => import(/* webpackChunkName: "restaurant" */ '../views/Restaurants')
  },
  {
    meta: {
      title: 'Google Analytics'
    },
    path: '/analytics',
    name: 'googleAnalytics',
    component: () => import(/* webpackChunkName: "googleAnalytics" */ '../views/GoogleAnalytics')
  },
  
  // {
  //   meta: {
  //     title: 'Feedback'
  //   },
  //   path: '/feedback',
  //   name: 'feedback',
  //   component: () => import(/* webpackChunkName: "feedback" */ '../views/Feedback')
  // },
  // {
  //   meta: {
  //     title: 'Modifier'
  //   },
  //   path: '/modifier',
  //   name: 'modifier',
  //   component: () => import(/* webpackChunkName: "modifier" */ '../views/Modifier')
  // },
  // {
  //   meta: {
  //     title: 'Banner'
  //   },
  //   path: '/banner',
  //   name: 'banner',
  //   component: () => import(/* webpackChunkName: "banner" */ '../views/Banner')
  // },
  // {
  //   meta: {
  //     title: 'QR-Code'
  //   },
  //   path: '/qr-code',
  //   name: 'qrcode',
  //   component: () => import(/* webpackChunkName: "qrcode" */ '../views/general/Qrcode')
  // },
  // {
  //   meta: {
  //     title: 'Publish'
  //   },
  //   path: '/publish',
  //   name: 'publish',
  //   component: () => import(/* webpackChunkName: "publish" */ '../views/general/Publish')
  // },
  // {
  //   meta: {
  //     title: 'View Menu'
  //   },
  //   path: '/view-menu',
  //   name: 'view-menu',
  //   component: () => import(/* webpackChunkName: "view-menu" */ '../views/general/ViewMenu')
  // },
  // {
  //   meta: {
  //     title: 'Devices'
  //   },
  //   path: '/devices',
  //   name: 'devices',
  //   component: () => import(/* webpackChunkName: "devices" */ '../views/general/Devices')
  // },
  // {
  //   meta: {
  //     title: 'Settings'
  //   },
  //   path: '/settings',
  //   name: 'settings',
  //   component: () => import(/* webpackChunkName: "settings" */ '../views/general/Settings')
  // },
  // {
  //   meta: {
  //     title: 'Login',
  //     formScreen: true
  //   },
  //   path: '/login',
  //   name: 'login',
  //   component: () => import(/* webpackChunkName: "login" */ '../views/base/Login')
  // }
]

const router = createRouter({
  mode:history,
  history: createWebHashHistory(),
  routes,
  scrollBehavior (to, from, savedPosition) {
    return savedPosition || { top: 0 }
  }
})

export default router
