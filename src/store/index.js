import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import _ from 'lodash'
import {
  setMinutes,
  setHours,
  isSameHour,
  differenceInMinutes,
  addMinutes
} from 'date-fns'
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
    budget: 3800,
    actualEvents: [],
    trip: null,
    actualTab: 0,
    tabsCount: 1,
    eventId: null,
    startTime: "16:00",
    endTime: "00:00"
  },
  mutations: {
    updEndTime: (state, endTime) => {
      state.endTime = endTime
    },  
    updStartTime: (state, startTime) => {
      state.startTime = startTime
    },  
    updBudget: (state, money) => {
      state.budget = money
    },
    setEventId: (state, id) => {
      state.eventId = id
    },
    makeSearchTab: (state) => {
      const {actualTab} = state
      state.actualEvents = []
      let tempTime = setMinutes(setHours(new Date(), state.startTime.split(":")[0]), state.startTime.split(":")[1])
      const endAsDate = setMinutes(setHours(new Date(), state.endTime.split(":")[0]), state.endTime.split(":")[1])
      const filteredEvents = state.events.filter(e => e.max_price<=state.budget/3)
      let filterdEventsByTime = []
      let counter = 0
      while(!isSameHour(tempTime, endAsDate)&&counter < filteredEvents.length) {
        
        const timeDiff = differenceInMinutes(new Date(filteredEvents[counter].date), tempTime)
        
        if(timeDiff>20&&timeDiff<70) {
          filterdEventsByTime.push(filteredEvents[counter])
          tempTime = addMinutes(new Date(filteredEvents[counter].date), 90)
          counter = 0
        }else {
          counter++
        }
      }
      console.log(filterdEventsByTime)
      const filterdEvents = filterdEventsByTime.slice(3*actualTab, actualTab*3 + 3)
      const points = filterdEvents.map(p => {
        return {
          geo: p.venue.google_address.split(",").reverse().join(',').replace(/\s/g, ""),
          id: p.id
        }
      })
      Axios.get(`https://api.mapbox.com/optimized-trips/v1/mapbox/driving/37.681174,55.718520;${points.map(g=>g.geo).join(";")}?access_token=pk.eyJ1IjoiaDhhcnQiLCJhIjoiY2p0ajF0bmYxMnY5NTQ2cDdnNzRxMHhlbyJ9.anl09z7LVH8i0-Bm0PHB0w&geometries=geojson`).then(resp => {
        state.actualEvents = filterdEvents
        state.trip = resp.data.trips[0].geometry
      })
      // for(let i = 0; i < random(2, 3); i++){
      //   /optimized-trips/v1/{profile}/
      //   state.actualEvents.push(state.events[random(0, state.events.length - 1)])
      // }
    },
    makeSearch: (state) => {
      state.actualEvents = []
      let tempTime = setMinutes(setHours(new Date(), state.startTime.split(":")[0]), state.startTime.split(":")[1])
      const endAsDate = setMinutes(setHours(new Date(), state.endTime.split(":")[0]), state.endTime.split(":")[1])
      const filteredEvents = state.events.filter(e => e.max_price<=state.budget/3)
      let filterdEventsByTime = []
      let counter = 0
      while(!isSameHour(tempTime, endAsDate)&&counter < filteredEvents.length) {
        const timeDiff = differenceInMinutes(new Date(filteredEvents[counter].date), tempTime)
        console.log(new Date(filteredEvents[counter].date), tempTime, timeDiff)
        if(timeDiff>20&&timeDiff<70) {
          filterdEventsByTime.push(filteredEvents[counter])
          tempTime = addMinutes(new Date(filteredEvents[counter].date), 90)
          counter = 0
        }else {
          counter++
        }
        
      }
      console.log(filterdEventsByTime.length)
      state.tabsCount = Math.round(filterdEventsByTime.length/3)
      const filterdEvents = filterdEventsByTime.slice(0, 3)
      const points = filterdEventsByTime.map(p => {
        return {
          geo: p.venue.google_address.split(",").reverse().join(',').replace(/\s/g, ""),
          id: p.id
        }
      })
      console.log(points)
      state.actualTab = 0
      Axios.get(`https://api.mapbox.com/optimized-trips/v1/mapbox/driving/37.681174,55.718520;${points.map(g=>g.geo).join(";")}?access_token=pk.eyJ1IjoiaDhhcnQiLCJhIjoiY2p0ajF0bmYxMnY5NTQ2cDdnNzRxMHhlbyJ9.anl09z7LVH8i0-Bm0PHB0w&geometries=geojson`).then(resp => {
        state.actualEvents = filterdEvents
        state.trip = resp.data.trips[0].geometry
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
    updTab: ({state, commit}, tab) => {
      state.actualTab = tab
      commit('makeSearchTab')
    },
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
