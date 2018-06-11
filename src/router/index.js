import Vue from 'vue'
import Router from 'vue-router'
import ItemsList from '@/components/ItemsList'
import Login from '@/components/Login'
import Register from '@/components/Register'
import ContactForm from '@/components/ContactForm'
import ItemActions from '@/components/ItemActions'
import Page404 from '@/components/Page404'
import store from '../store'

Vue.use(Router)

const ifAuthenticated = (to, from, next) => {
  if (store.state.isAuth) {
    next()
    return
  }
  next('/login')
}

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'ItemsList',
      component: ItemsList
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/item/:id(\\d+)',
      name: 'ContactForm',
      component: ContactForm
    },
    {
      path: '/edit/:id(\\d+)',
      name: 'EditForm',
      component: ItemActions,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/add',
      name: 'AddForm',
      component: ItemActions,
      beforeEnter: ifAuthenticated
    },
    {
      path: '*',
      name: 'Page404',
      component: Page404
    }
  ]
})
