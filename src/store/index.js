import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)
function arr_diff (a1, a2) {

  var a = [], diff = [];

  for (var i = 0; i < a1.length; i++) {
      a[a1[i]] = true;
  }

  for (var i = 0; i < a2.length; i++) {
      if (a[a2[i]]) {
          delete a[a2[i]];
      } else {
          a[a2[i]] = true;
      }
  }

  for (var k in a) {
      diff.push(k);
  }

  return diff;
}
export default new Vuex.Store({
  state: {
    inSearch: true,
    categories: null,
    events: null
  },
  mutations: {
    openSearch: (state) => {
      state.inSearch = true
    },
    updCategories: (state, payload) => {
      state.categories = payload
    },
    updEvents: (state, payload) => {
      state.events = [state.events, ...payload]
    },
  },
  actions: {
    getEvents: ({commit, state}, payload) => {
      if(state.events&&state.events.filter(ev => ev.mainCategory == payload).length>0){
        state.events = state.events.filter(ev => ev.mainCategory != payload)
      } else {
        Axios.get('https://api.ponominalu.ru/v4/events/list?category_id='+payload+'&min_date=2020-02-09&max_date=2020-02-10&region=10',{
          headers: {
            Accept: 'application/json',
            Authorization: 'Token 5061471b-bd39-44c8-b10e-513073025dd8'
          }
        }).then(resp => {
          const tempEv = resp.data.message.map(e => e.subevents[0])
          commit('updEvents', tempEv.map(eve => {
            const tEve = eve
            tEve.mainCategory = payload
            return tEve
          }))
        })
      }
      
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
