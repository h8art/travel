<template lang='pug'>
  v-app
    v-card.pa-4.inner(flat='', height='100vh', img='https://cdn.vuetifyjs.com/images/toolbar/map.jpg')
      v-card.search.pa-4
        .search-box
          v-text-field(hide-details='', prepend-icon='search', single-line='')
          v-btn(icon='')
            v-icon my_location
          v-btn(icon='')
            v-icon mdi-dots-vertical
      .side
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
import HelloWorld from './components/HelloWorld';

export default {
  name: 'App',

  components: {
    HelloWorld,
  },
  mounted() {
    // this.$vuetify.theme.dark = true
  },
  data: () => ({
    //
  }),
};
</script>
<style lang="sass" scoped>
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
      width: 480px
      display: flex
      align-items: baseline
  .side
    max-height: 100vh
    overflow-y: overlay
    &-card
      transform: translateX(200px)
      transition: transform .3s
      margin-bottom: 15px
      &:hover
        transform: translateX(0px)
</style>