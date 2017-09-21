import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/layouts/Hello'
import Index from '@/layouts/index'
import List from '@/layouts/list'
import Edit from '@/layouts/edit'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/hello',
      name: 'hello',
      component: Hello
    },
    {
      path: '/list',
      name: 'list',
      component: List
    },
    {
      path: '/edit/:id?',
      name: 'edit',
      component: Edit
    }
  ]
})
