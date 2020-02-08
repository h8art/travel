import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import _ from 'lodash'
Vue.use(Vuex)
// function random(min, max) {
//   let rand = min - 0.5 + Math.random() * (max - min + 1);
//   return Math.round(rand);
// }
export default new Vuex.Store({
  state: {
    inSearch: false,
    categories: null,
    events: [],
    actualEvents: []
  },
  mutations: {
    makeSearch: (state) => {
      state.actualEvents = []
      const points = state.events.slice(0, size)
      
      Axios.get(`https://api.mapbox.com/optimized-trips/v1/mapbox/driving/37.681174,55.718520;37.681174,55.718520?access_token=pk.eyJ1IjoiaDhhcnQiLCJhIjoiY2p0ajF0bmYxMnY5NTQ2cDdnNzRxMHhlbyJ9.anl09z7LVH8i0-Bm0PHB0w&geometries=geojson`).then(resp => {
        console.log(resp.data)
      })
      // for(let i = 0; i < random(2, 3); i++){
      //   /optimized-trips/v1/{profile}/
      //   state.actualEvents.push(state.events[random(0, state.events.length - 1)])
      // }
    },
    openSearch: (state) => {
      state.inSearch = true
    },
    updCategories: (state, payload) => {
      state.categories = payload
    },
    updEvents: (state, payload) => {
      state.events = [...state.events, ...payload]
      state.events = _.shuffle(state.events)
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
          const tempEv = resp.data.message.map(e => {
            var sub = e.subevents[0]
            sub.title = e.title
            return sub
          })
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
