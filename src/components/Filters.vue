<template lang="pug">
div
  v-select(v-model='category', :items='categories', item-text='title', item-value='id' attach='', chips='', label='Категории', multiple='', @change='changeCategory')
  
</template>
<script>
export default {
  data: () => ({
    category: null,
  }),
  computed: {
    categories() {
      return this.$store.state.categories
    }
  },
  methods: {
    changeCategory(val){
      this.$store.dispatch('getEvents', val)
    }
  }
}
</script>
<style lang="sass" scoped>
.card
  width: 400px
  margin-top: 10px
  margin-left: 10px
  margin-bottom: 10px
</style>