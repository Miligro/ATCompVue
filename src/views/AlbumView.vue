<template>
  <div class="main">
    <div class="container">
      <div class="row-center">
        <h1>Zdjęcia z albumu</h1>
      </div>
      <div class="row-center">
        <hr />
      </div>
    </div>
    <TheSlider2 v-if="photos" :images="photos" />
  </div>
  <div class="loading-small" v-if="!photos">
    <TheLoader />
  </div>
</template>

<script>
import { getPhotos } from '../scripts/albumsApi'
import TheSlider2 from '../components/TheSlider2.vue'
export default {
  components: {
    TheSlider2,
  },
  data() {
    return {
      photos: null,
    }
  },
  methods: {
    async getPhotos() {
      this.photos = await getPhotos(+this.$route.params.id)
    },
  },
  mounted() {
    this.getPhotos()
  },
}
</script>
