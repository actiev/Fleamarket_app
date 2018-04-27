import Vue from 'vue'
import Router from 'vue-router'
import AddsList from '@/components/AddsList'
import Login from '@/components/Login'
import Register from '@/components/Register'
import SingleAdd from '@/components/SingleAdd'
import AddForm from '@/components/AddForm'
import EditForm from '@/components/EditForm'
import Page404 from '@/components/Page404'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'AddsList',
            component: AddsList
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/register',
            name: 'Registration',
            component: Register
        },
        {
            path: '/:id(\\d+)',
            name: 'SingleAdd',
            component: SingleAdd
        },
        {
            path: '/edit:id(\\d+)',
            name: 'EditForm',
            component: EditForm
        },
        {
            path: '/add',
            name: 'AddForm',
            component: AddForm
        },
        {
            path: '*',
            name: 'Page404',
            component: Page404
        }
    ]
})
