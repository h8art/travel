import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    inSearch: false,
    categories: []
  },
  mutations: {
    openSearch: (state) => {
      state.inSearch = true
    },
    updCategories: (state, payload) => {
      state.categories = payload
    }
  },
  actions: {
    getCategories: ({commit}) => {
      Axios.post('http://api.ponominalu.ru/v4/categories/list', {},{
        headers: {
          Accept: 'application/json',
          Authorization: 'Token 5061471b-bd39-44c8-b10e-513073025dd8'
        }
      }).then(resp => {
        commit('updCategories', resp.data)
      })
    }
  },
  modules: {
  }
})
