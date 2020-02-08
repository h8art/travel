import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    inSearch: false
  },
  mutations: {
    openSearch: (state) => {
      state.inSearch = true
    }
  },
  actions: {
  },
  modules: {
  }
})
