<template lang='pug'>
#map
</template>

<script>
/* eslint-disable no-undef */
import { MglMap, MglMarker, MglGeojsonLayer, MglPopup } from 'vue-mapbox'
import axios from 'axios'

export default {
  name: 'MainMap',
  components: { MglMap, MglMarker, MglGeojsonLayer, MglPopup },
  computed: {
    inSearch() {
      return this.$store.state.inSearch
    },
    events() {
      return this.$store.state.events
    }
  },
  watch: {
    events() {
      this.removeAllMarkers()
      this.addAllMarkers()
    }
  },
  methods: {
    removeAllMarkers() {
      this.markers.forEach(m => {
        m.remove()
      })
      this.markers.length = 0
    },
    addAllMarkers() {
      this.events.forEach((ev) => {
        var el = document.createElement('div');
        el.className = 'marker-icon';
        el.style.backgroundImage= `url('/${ev.mainCategory}.png')`;
        this.markers.push(new mapboxgl.Marker(el).setLngLat(ev.venue.google_address.split(",").reverse()).addTo(this.map));
      })
    }
  },
  mounted() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiaDhhcnQiLCJhIjoiY2p0ajF0bmYxMnY5NTQ2cDdnNzRxMHhlbyJ9.anl09z7LVH8i0-Bm0PHB0w';
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/h8art/cjtvhhlyw0z391fpcym18tz2e/draft',
      center: [37.618423, 55.751244],
      zoom: 11
    });
    this.map.on('load', () => {
      this.categories 
      axios.get('https://api.mapbox.com/directions/v5/mapbox/driving/37.51718,55.6814895;37.668817,55.7526269?geometries=geojson&access_token=pk.eyJ1IjoiaDhhcnQiLCJhIjoiY2p0ajF0bmYxMnY5NTQ2cDdnNzRxMHhlbyJ9.anl09z7LVH8i0-Bm0PHB0w').then((resp) => {
        this.map.addSource('route', {
          'type': 'geojson',
          'data': {
            'type': 'Feature',
            'properties': {},
            'geometry': resp.data.routes[0].geometry
          }
        });
        this.map.addLayer({
          'id': 'route',
          'type': 'line',
          'source': 'route',
          'layout': {
            'line-join': 'round',
            'line-cap': 'round'
          },
          'paint': {
            'line-color': '#f8ff88',
            'line-width': 1
          }
        });
      })
    })
  },

  data() {
    return {
      accessToken: 'pk.eyJ1IjoiaDhhcnQiLCJhIjoiY2p0ajF0bmYxMnY5NTQ2cDdnNzRxMHhlbyJ9.anl09z7LVH8i0-Bm0PHB0w',
      mapStyle: 'mapbox://styles/h8art/cjtvhhlyw0z391fpcym18tz2e/draft',
      coordinates: [37.618423, 55.751244],
      center: {lng: 37.618423, lat: 55.751244},
      map: null,
      markers: []
    }
  }
}
</script>
<style lang="sass">
.marker-icon
  background-size: cover
  width: 32px
  height: 32px
  border-radius: 50%
  cursor: pointer
</style>
<style lang="sass" scoped>
.card
  width: 400px
  color: #000
</style>