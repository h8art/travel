<template lang="pug">
  v-dialog(:value='opened' width='650px')
    v-card
      div(v-if='event')
        v-img.white--text.align-end(height='300px', :src='`https://media.ponominalu.ru/i/650x300/${event.image_wide_clean}`')
          v-card-title.tit {{event.title}}
        v-card-subtitle.pb-0 {{event.venue.title}}
        v-card-text.text--primary
          div(v-html='event.description')
      div(v-else) Loading or broke...
</template>
<script>
import axios from 'axios'
export default {
  computed: {
    eventId() {
      return this.$store.state.eventId
    },
    opened() {
      if(this.eventId!=null) return true
      return false
    }
  },
  data() {
    return {
      event: null
    }
  },
  watch: {
    eventId(val) {
      if(val!=null) {
        axios.get('https://api.ponominalu.ru/v4/subevents/get?id='+val,{
          headers: {
            Accept: 'application/json',
            Authorization: 'Token 5061471b-bd39-44c8-b10e-513073025dd8'
          }
        }).then(resp => {
          this.event = resp.data.message
          axios.get('https://api.ponominalu.ru/v4/subevents/description/get?id=' + val,{
            headers: {
              Accept: 'application/json',
              Authorization: 'Token 5061471b-bd39-44c8-b10e-513073025dd8'
            }
          }).then((resp) => {
            this.event.description = resp.data.message
          })
        })
      }
    }
  }
}
</script>
<style lang="sass" scoped>
.tit
  background: rgba(0,0,0,.6)
</style>