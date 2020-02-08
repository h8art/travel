<template lang='pug'>
  v-app
    .inner
      MainMap.map
      v-card.search.pa-4
        .search-box
          v-text-field(prepend-icon='location_on', single-line='',  placeholder='Введите адрес')
          v-btn(icon='')
            v-icon my_location
        v-slider.align-center.mb-4(v-model='slider', :max='max', :min='min', hide-details='' label="Бюджет")
          template(v-slot:append='')
            v-text-field.mt-0.pt-0(v-model='slider', hide-details='', single-line='', type='number', style='width: 100px' append-icon='attach_money')
        v-btn.mb-2(block text @click='dialog=true') Указать интересы
        Interests(:opened='dialog' @close='dialog = false')
        v-btn(block color='primary') Поиск
      transition(enter-active-class="animated slideInRight" leave-active-class="animated slideOutRight")
        .side(v-if='!inSearch')
          v-card.mx-auto.side-card(max-width='400' v-for='i in 5')
            v-img.white--text.align-end(height='150px', src='https://images.genius.com/b0e6093f6a03a653662c7a2ec299ae9a.1000x1000x1.jpg')
              v-card-title ПАНЦУШОТ
            v-card-subtitle.pb-0 Лучая группа
            v-card-text.text--primary
              div Где-то там
              div Когда-то там
            v-card-actions
              v-btn(color='orange', text='') Узнать подробнее
</template>

<script>
import MainMap from './components/MainMap'
import Interests from './components/Interests'
export default {
  name: 'App',

  components: {
    MainMap,
    Interests
  },
  mounted() {
    this.$vuetify.theme.dark = true
  },
  computed: {
    inSearch() {
      return this.$store.state.inSearch
    }
  },
  data: () => ({
    dialog: true
  }),
};
</script>
<style lang="sass">
.mapboxgl-ctrl, .mapboxgl-ctrl-attrib
  display: none !important
</style>
<style lang="sass" scoped>
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
    margin-left: 200px
    width: fit-content
    margin-top: 200px
    height: fit-content
    .search-box
      width: 500px
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