import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const Store = new Vuex.Store({
  state: {
    addsList: [],
    categoryList: [],
    addItem: {},
    currentPage: 1
  },
  mutations: {
    updateAddsList (state, data) {
      state.addsList = data
    },
    updateCategoryList (state, data) {
      state.categoryList = data
    },
    updateAddItem (state, data) {
      state.addItem = data
    },
    updateCurrentPage (state, data) {
      state.currentPage = data
    }
  },
  actions: {
    setList (context, params) {
      context.commit('updateAddsList', params.data)
    },
    setCategories (context, params) {
      context.commit('updateCategoryList', params.data)
    },
    loadById (context, params) {
      context.state.addsList.forEach(item => {
        if (item.id === params.id) {
          let editedItem = {}
          Object.assign(editedItem, item)
          context.commit('updateAddItem', editedItem)
        }
      })
    },
    save (context, params) {
      context.state.addsList.forEach(item => {
        if (item.id === params.item.id) {
          item.title = params.item.title
          item.price = params.item.price
          item.description = params.item.description
          item.category_id = params.item.category_id
          item.user_id = params.item.user_id
        }
      })

      context.commit('updateAddsList', context.state.addsList)
    },
    setPage (context, params) {
      context.commit('updateCurrentPage', params.data)
    }
  }
})

export default Store
