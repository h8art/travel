<template lang="pug">
  .trip
    v-card.mx-auto.side-card.card(max-width='400' v-for='i in 5')
      v-img.white--text.align-end(height='150px', src='https://i.ytimg.com/vi/BPxQqGOwnyM/maxresdefault.jpg')
        v-card-title GSPD
      v-card-subtitle.pb-0 Я гей
      v-card-text.text--primary
        div Где-то там
        div Когда-то там
      v-card-actions
        .spacer
        v-btn(color='orange' text) Сменить
        v-btn(color='orange', text='') Узнать подробнее
</template>
<script>
export default {
  
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
</style>