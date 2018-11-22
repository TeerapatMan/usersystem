import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/page/login'
import loginAdmin from '@/page/loginAdmin'

import Home from '@/components/home'
import Setting from '@/components/setting'

import Main from '@/page/Main'

import ManageUser from '@/components/admin/ManageUser'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/logout',
      name: 'logout',
      beforeEnter: (to, from, next) => {
        localStorage.clear()
        next('/')
      }
    },
    {
      path: '/admin',
      name: 'loginAdmin',
      component: loginAdmin
    },
    {
      path: '/main',
      name: 'main',
      components: {
        default: Main,
      },
      children: [{
          path: '',
          name: 'home',
          component: Home
        },
        {
          path: '/main/setting',
          name: 'setting',
          component: Setting
        },
        {
          path: '/main/manageUser',
          name: 'ManageUser',
          component: ManageUser
        },
      ]
    },
  ]
})