<template lang="pug">
  v-dialog(width='800', :value='opened')
    v-card
      v-card-title.headline(primary-title='') Интересы
      v-divider
      Bubbles
      v-divider
      v-btn(text block) Импорт аккаунта МТС Музыка
      v-btn(text block) Импорт аккаунта Вконтакте
      v-btn(text block) Импорт аккаунта Last.FM
      v-divider
      v-card-actions
        v-spacer
        v-btn(color='primary', text='', @click='$emit("close")') Закрыть
</template>
<script>
import Bubbles from './Bubbles'

export default {
  props: ['opened'],
  name: 'Interests',
  components: {Bubbles}
}
</script>
<style lang="sass" scoped>

</style>