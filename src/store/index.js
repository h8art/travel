import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    inSearch: true,
    categories: null,
    events: []
  },
  mutations: {
    openSearch: (state) => {
      state.inSearch = true
    },
    updCategories: (state, payload) => {
      state.categories = payload
    },
    updEvents: (state, payload) => {
      state.events = [...state.events, ...payload]
    },
  },
  actions: {
    getEvents: ({commit, state}, payload) => {
      if(state.events.length/20>payload.length){
        state.events = state.events.filter(ev => payload.includes(ev.mainCategory))
      }else {
        const catId = payload[payload.length - 1]
        Axios.get('https://api.ponominalu.ru/v4/events/list?category_id='+catId+'&min_date=2020-02-09&max_date=2020-02-10&region=10&&limit=20',{
          headers: {
            Accept: 'application/json',
            Authorization: 'Token 5061471b-bd39-44c8-b10e-513073025dd8'
          }
        }).then(resp => {
          const tempEv = resp.data.message.map(e => e.subevents[0])
            commit('updEvents', tempEv.map(eve => {
              const tEve = eve
              tEve.mainCategory = catId
              return tEve
            }))
        })
      }
      
      // if(state.events&&state.events.filter(ev => ev.mainCategory == payload).length>0){
      //   state.events = state.events.filter(ev => ev.mainCategory != payload)
      // } else {
        
      // }
      
    },
    getCategories: ({commit}) => {
      Axios.post('https://api.ponominalu.ru/v4/categories/list', {},{
        headers: {
          Accept: 'application/json',
          Authorization: 'Token 5061471b-bd39-44c8-b10e-513073025dd8'
        }
      }).then(resp => {
        commit('updCategories', resp.data.message)
      })
    }
  },
  modules: {
  }
})
