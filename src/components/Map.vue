<template>
  <div class="maps">
    <h6 class="m-0">Coordinate :</h6>
    <small>{{ coordinate.lat }},{{ coordinate.lng }}</small
    ><br />
    <small class=" text-secondary p-0 mb-2">
      copy these coorditase to edit profile, so your friends can know your
      location
    </small>
    <GmapMap
      :center="coordinate"
      :zoom="14"
      map-type-id="terrain"
      style="width: 280px; height: 300px"
    >
      <GmapMarker
        :position="coordinate"
        :clickable="true"
        :draggable="true"
        @click="center = coordinate"
      />
    </GmapMap>
  </div>
</template>
<script>
export default {
  data() {
    return {
      coordinate: {}
    }
  },
  created() {
    this.$getLocation()
      .then(coordinates => {
        this.coordinate = {
          lat: coordinates.lat,
          lng: coordinates.lng
        }
      })
      .catch(err => {
        alert(err)
      })
  },
  methods: {
    clickmarker(e) {
      console.log(e.latLng.lat())
      console.log(e.latLng.lng())
    }
  }
}
</script>
