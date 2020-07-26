/* eslint-disable no-undef */
import Vue from 'vue'
import Router from 'vue-router'

const main = () => import(/* webpackChunkName: "login_home_welcome" */ '../modules/main.vue')

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', redirect: '/calendar' },
    { path: '/calendar', component: main }
  ]
})
