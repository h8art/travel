<template lang="pug">
  .trip
    v-card.mx-auto.side-card.card(max-width='400' v-for='e in events' :key='e.id')
      v-img.white--text.align-end(height='150px', :src='`https://media.ponominalu.ru/i/400x400/${e.image}`')
        v-card-title.tit {{e.title}}
      v-card-subtitle.pb-0 {{e.venue.title}}
      v-card-text.text--primary
        div Длительность: 1.5ч
        div Стоимость: {{e.max_price}} руб.
      v-card-actions
        .spacer
        v-btn(color='primary', text='') Узнать подробнее
</template>
<script>
function formatDate(dat) {
  var monthNames = [
    "янв", "фев", "март",
    "апр", "май", "июнь", "июль",
    "авг", "сен", "окт",
    "ноя", "дек"
  ];
  var date = new Date(dat)
  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  return day + ' ' + monthNames[monthIndex] + ' ' + year;
}
export default {
  computed: {
    events() {
      return this.$store.state.actualEvents
    }
  },
  methods: {
    fDate(date) {
      return formatDate(date)
    }
  }
}
</script>
<style lang="sass" scoped>
.trip
  position: absolute
  z-index: 2
  top: 0
  right: 0
  width: 400px
  padding: 10px
  height: 100vh
  overflow: auto
.card
  margin-bottom: 10px
.tit
  background: rgba(0,0,0,.6)
</style>