<template lang="pug">
  v-card.card.pa-4
    v-select(v-model='category', :items='categoryList', attach='', chips='', label='Категории', multiple='')
</template>
<script>
export default {
  data: () => ({
    category: null,
    categoryList: [
      'Концерты',
      'Театр',
      'Елки',
      'Детям',
      'Шоу',
      'Спорт',
      'Семинары',
      'Мюзиклы',
      'Выставки',
      'Экскурсии',
      'Музеи',
      'Фестивали лета',
      'Фестивали',
      'Цирки',
    ]
  })
}
</script>
<style lang="sass" scoped>
.card
  width: 400px
  margin-top: 10px
  margin-left: 10px
  margin-bottom: 10px
  flex: 1
</style>