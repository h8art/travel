<template lang='pug'>
MglMap(container='map-test', :center.sync='center', :accessToken='accessToken', :mapStyle='mapStyle', :zoom='9')
  //- MglMarker(:coordinates.sync='markerCoordinates', color='green')
</template>

<script>
import { MglMap, MglMarker, MglGeojsonLayer } from 'vue-mapbox'

export default {
  name: 'App',
  components: { MglMap, MglMarker, MglGeojsonLayer },
  data() {
    return {
      accessToken: 'pk.eyJ1IjoiaDhhcnQiLCJhIjoiY2p0ajF0bmYxMnY5NTQ2cDdnNzRxMHhlbyJ9.anl09z7LVH8i0-Bm0PHB0w',
      mapStyle: 'mapbox://styles/h8art/cjtvhhlyw0z391fpcym18tz2e',
      markerCoordinates: [37.618423, 55.751244],
      center: {lng: 37.618423, lat: 55.751244}
    }
  }
}
</script>