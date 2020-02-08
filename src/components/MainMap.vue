<template lang='pug'>
MglMap(container='map-test', :center.sync='center', :accessToken='accessToken', :mapStyle='mapStyle', :zoom='11')
  MglMarker(:coordinates='coordinates')
    img(slot='marker' src='@/assets/cinema_32.png')
    MglPopup
      div
        h2 Название мероприятия
        span ваувауавауауауававауаваувау
</template>

<script>
import { MglMap, MglMarker, MglGeojsonLayer, MglPopup } from 'vue-mapbox'

export default {
  name: 'MainMap',
  components: { MglMap, MglMarker, MglGeojsonLayer, MglPopup },
  computed: {
    inSearch() {
      return this.$store.state.inSearch
    }
  },
  data() {
    return {
      accessToken: 'pk.eyJ1IjoiaDhhcnQiLCJhIjoiY2p0ajF0bmYxMnY5NTQ2cDdnNzRxMHhlbyJ9.anl09z7LVH8i0-Bm0PHB0w',
      mapStyle: 'mapbox://styles/h8art/cjtvhhlyw0z391fpcym18tz2e',
      coordinates: [37.618423, 55.751244],
      center: {lng: 37.618423, lat: 55.751244}
    }
  }
}
</script>
<style lang="sass" scoped>
.card
  width: 400px
  color: #000
</style>