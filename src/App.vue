<template lang='pug'>
  v-app
    .inner
      RouteTabs
      FullInfo
      MainMap.map
      .left
        v-card.search.pa-4(:style='searchStyle')
          .search-box
            v-text-field(prepend-icon='location_on', single-line='',  placeholder='Введите адрес', value='Южнопортовая улица, 22с1')
          v-slider.align-center.mb-4(v-model='budgetInp', :max='10000', :min='2500', hide-details='' label="Бюджет")
            template(v-slot:append='')
              v-text-field.mt-0.pt-0(v-model='budgetInp', hide-details='', single-line='', type='number', ,style='width: 100px' suffix='руб.')
          filters
          v-expansion-panels(flat)
            v-expansion-panel
              v-expansion-panel-header Дополнительные параметры
              v-expansion-panel-content
                v-text-field(placeholder='Конечная точка маршрута')
                v-row
                  v-menu(ref='menu1', v-model='menu1', :close-on-content-click='false', :return-value.sync='startTime', transition='scale-transition',  max-width='290px', min-width='290px')
                    template(v-slot:activator='{ on }')
                      v-text-field(v-model='startTime', label='Время начала', format="24hr", prepend-icon='access_time', readonly='', v-on='on')
                    v-time-picker(v-if='menu1', v-model='startTime', full-width='', @click:minute='$refs.menu1.save(startTime)')
                  v-menu(ref='menu2', v-model='menu2', :close-on-content-click='false', :return-value.sync='endTime', transition='scale-transition',  max-width='290px', min-width='290px')
                    template(v-slot:activator='{ on }')
                      v-text-field(v-model='endTime', label='Конченое время', readonly='', v-on='on')
                    v-time-picker(v-if='menu2', v-model='endTime', full-width='', format="24hr", @click:minute='$refs.menu2.save(endTime)')
          v-btn.mb-2(block text @click='dialog=true') Указать интересы
          Interests(:opened='dialog' @close='dialog = false')
          v-btn(block color='primary' @click='search') Поиск
      transition(enter-active-class="animated slideInRight" leave-active-class="animated slideOutRight")
        Trip(v-if='events')
      //- transition(enter-active-class="animated slideInRight" leave-active-class="animated slideOutRight")
      //-   .side(v-if='!inSearch')
      //-     v-card.mx-auto.side-card(max-width='400' v-for='i in 5')
      //-       v-img.white--text.align-end(height='150px', src='https://images.genius.com/b0e6093f6a03a653662c7a2ec299ae9a.1000x1000x1.jpg')
      //-         v-card-title ПАНЦУШОТ
      //-       v-card-subtitle.pb-0 Лучая группа
      //-       v-card-text.text--primary
      //-         div Где-то там
      //-         div Когда-то там
      //-       v-card-actions
      //-         v-btn(color='orange', text='') Узнать подробнее
</template>

<script>
import MainMap from './components/MainMap'
import Interests from './components/Interests'
import Filters from './components/Filters'
import Trip from './components/Trip'
import RouteTabs from './components/RouteTabs'
import FullInfo from './components/FullInfo'
export default {
  name: 'App',

  components: {
    MainMap,
    Interests,
    Filters,
    Trip,
    RouteTabs,
    FullInfo
  },
  mounted() {
    this.$vuetify.theme.dark = true
    this.$store.dispatch('getCategories')
  },
  computed: {
    startTime: {
      get() {
        return this.$store.state.startTime
      },
      set(val) {
        this.$store.commit('updStartTime', val)
      }
    },
    endTime: {
      get() {
        return this.$store.state.endTime
      },
      set(val) {
        this.$store.commit('updEndTime', val)  
      }
    },
    budgetInp: {
      get() {
        return this.$store.state.budget
      },
      set(val) {
        this.$store.commit('updBudget', val)
      }
    },
    events() {
      return this.$store.state.actualEvents.length
    },
    inSearch() {
      return this.$store.state.inSearch
    },
    searchStyle() {
      if(this.inSearch) {
        return 'margin-left: 10px; margin-top: 10px; width: 400px'
      }else  {
        return 'margin-left: 200px; margin-top: 200px; width: 500px'
      }
    }
  },
  methods: {
    search() {
      this.$store.commit('openSearch')
      if(this.inSearch) {
        this.$store.commit('makeSearch')
      }
    }
  },
  data: () => ({
    dialog: false,
    menu1: false,
    menu2: false
  }),
};
</script>
<style lang="sass">
.mapboxgl-ctrl, .mapboxgl-ctrl-attrib
  display: none !important
</style>
<style lang="sass" scoped>
.left
  display: flex
  height: 100vh
  flex-direction: column
.map
  position: absolute
  left: 0
  top: 0
  right: 0
  bottom: 0
.inner
  width: 100%
  display: flex
  justify-content: space-between
  .search
    width: fit-content
    height: fit-content
    transition: all 1s
    .search-box
      display: flex
      align-items: baseline
  .side
    max-height: 100vh
    overflow-y: overlay
    padding-top: 40px
    &-card
      transform: translateX(200px)
      transition: transform .3s
      margin-bottom: 15px
      &:hover
        transform: translateX(0px)
.fl
  display: flex
.jc-sb
  justify-content: space-between
</style>