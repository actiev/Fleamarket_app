import Vue from 'vue'
import Router from 'vue-router'
import ProductsList from '@/components/ProductsList'
import Login from '@/components/Login'
import Register from '@/components/Register'
import ContactForm from '@/components/ContactForm'
import ProductActions from '@/components/ProductActions'
import Page404 from '@/components/Page404'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'ProductsList',
      component: ProductsList
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
      path: '/:id(\\d+|new)',
      component: ProductActions,
      name: 'ProductActions'
    },
    {
      path: '/:id(\\d+)/contact',
      component: ContactForm,
      name: 'ContactForm'
    },
    {
      path: '*',
      name: 'Page404',
      component: Page404
    }
  ]
})
