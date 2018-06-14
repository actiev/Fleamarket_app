import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import API from './api'

Vue.use(Vuex)

let formData = new FormData()
const token = localStorage.getItem('user-token')

const Store = new Vuex.Store({
  state: {
    productsList: [],
    categoryList: [],
    product: {
      title: 'title',
      price: '0',
      description: 'default',
      category_id: 3,
      image: '../static/img/noimage.png'
    },
    pages: 1,
    access: false,
    uploads: API.images,
    user: {},
    isAuth: !!token
  },
  mutations: {
    updateProductsList (state, data) {
      state.productsList = data
    },
    updatePages (state, data) {
      state.pages = data
    },
    updateCategoryList (state, data) {
      state.categoryList = data
    },
    getProduct (state, data) {
      state.product = data
    },
    getAccess (state, data) {
      state.access = data
    },
    updateAuth (state, data) {
      state.isAuth = data
    },
    updateUser (state, data) {
      state.user = data
    }
  },
  actions: {
    login (context, params) {
      return axios.post(API.login, params)
        .then(response => {
          if (response.status === 200) {
            localStorage.setItem('user-token', response.data)
            context.commit('updateUser', response.data)
            context.commit('updateAuth', true)
          }
        })
    },
    register (context, params) {
      return axios.post(API.register, params)
        .then(response => {
          if (response.status === 200) {
            localStorage.setItem('user-token', response.data)
            context.commit('updateUser', response.data)
            context.commit('updateAuth', true)
          }
        })
    },
    logout (context) {
      return axios.post(API.logout, null, {headers: {'X-Auth': token}})
        .then(response => {
          if (response.status === 200) {
            localStorage.removeItem('user-token')
            context.commit('updateUser', response.data)
            context.commit('updateAuth', false)
          }
        })
    },
    setList (context, params) {
      return axios.get(API.products, params)
        .then(response => {
          context.commit('updateProductsList', response.data.products)
          if (response.data.pages[0] !== undefined) context.commit('updatePages', parseInt(response.data.pages[0].pages))
        })
    },
    setCategories (context) {
      return axios.get(API.categories)
        .then(response => {
          context.commit('updateCategoryList', response.data)
        })
    },
    loadById (context, params) {
      if (parseInt(params)) {
        return axios.get(API.product + params, {headers: {'X-Auth': token}})
          .then(response => {
            context.commit('getProduct', response.data.product)
            context.commit('getAccess', response.data.access)
            return response
          })
      } else {
        context.commit('getProduct', {})
      }
    },
    create (context, params) {
      for (let field in params) {
        formData.append(field, params[field])
      }
      return axios.post(API.product, formData, {headers: {'X-Auth': token, 'Content-Type': 'multipart/form-data'}})
        .then(response => {
          return response.data
        })
    },
    update (context, params) {
      return axios.put(API.product + params.id, params, {headers: {'X-Auth': token}})
        .then(response => {
          return response.data
        })
    },
    updateImage (context, params) {
      formData.append('image', params.image)

      return axios.post(API.product + params.id, formData, {headers: {'X-Auth': token, 'Content-Type': 'multipart/form-data'}})
        .then(response => {
          return response.data
        })
    },
    delete (context, params) {
      return axios.delete(API.product + params, {headers: {'X-Auth': token}})
        .then(response => {
          return response.data
        })
    },
    sendMessage (context, params) {
      return axios.post(API.message, params)
        .then(response => {
          return response.data
        })
    }
  }

})

export default Store
