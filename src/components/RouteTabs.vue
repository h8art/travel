<template lang="pug">
transition(enter-active-class="animated slideInDown" leave-active-class="animated slideOutUp" mode="out-in")
  .fl(:key='tabsKey', v-if='events.length>0')
    v-card.card
      v-tabs(v-model="tab")
        v-tab 1
        v-tab 2
        v-tab 3
</template>
<script>
export default {
  data() {
    return {
      tabsKey: false,
      tab: 0
    }
  },
  watch: {
    tab() {
      this.$store.dispatch('updTab',this.tab)
    },
    events() {
      if(this.events.length>0){
        this.tabsKey = !this.tabsKey
      }
    }
  },
  methods: {
 
  },
  computed: {
    actualTab() {
      return this.$store.state.actualTab
    },
    events() {
      return this.$store.state.actualEvents
    },
  }
}
</script>
<style lang="sass" scoped>
.card
  margin-top: 10px
.fl
  position: absolute
  z-index: 2
  top: 0px
  display: flex
  width: 100%
  justify-content: center
</style>