import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import API from './api'

Vue.use(Vuex)

let formData = new FormData()

const Store = new Vuex.Store({
  state: {
    ItemsList: [],
    categoryList: [],
    item: {},
    pages: 1,
    uploads: API.images,
    user: {},
    isAuth: !!localStorage.getItem('user-token')
  },
  mutations: {
    updateItemsList (state, data) {
      state.ItemsList = data
    },
    updatePages (state, data) {
      state.pages = data
    },
    updateCategoryList (state, data) {
      state.categoryList = data
    },
    getItem (state, data) {
      state.item = data
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
      return axios.post(API.logout, null, {headers: {'X-Auth': localStorage.getItem('user-token')}})
        .then(response => {
          if (response.status === 200) {
            localStorage.removeItem('user-token')
            context.commit('updateUser', response.data)
            context.commit('updateAuth', false)
          }
        })
    },
    setList (context, params) {
      return axios.get(API.list, params)
        .then(response => {
          context.commit('updateItemsList', response.data.items)
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
      if (params != null) {
        return axios.get(API.item + params)
          .then(response => {
            context.commit('getItem', response.data)
          })
      } else {
        context.commit('getItem', {})
      }
    },
    create (context, params) {
      for (let field in params) {
        formData.append(field, params[field])
      }
      return axios.post(API.item, formData, {headers: {'X-Auth': localStorage.getItem('user-token'), 'Content-Type': 'multipart/form-data'}})
        .then(response => {
          return response.data
        })
    },
    update (context, params) {
      return axios.put(API.item + params.id, params, {headers: {'X-Auth': localStorage.getItem('user-token')}})
        .then(response => {
          return response.data
        })
    },
    updateImage (context, params) {
      formData.append('image', params.image)

      return axios.post(API.item + params.id, formData, {headers: {'X-Auth': localStorage.getItem('user-token'), 'Content-Type': 'multipart/form-data'}})
        .then(response => {
          return response.data
        })
    },
    delete (context, params) {
      return axios.delete(API.item + params, {headers: {'X-Auth': localStorage.getItem('user-token')}})
        .then(response => {
          return response.data
        })
    }
  }

})

export default Store
