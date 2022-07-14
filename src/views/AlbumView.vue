<template>
  <div class="main">
    <div class="container">
      <div class="row-center">
        <h1>Zdjęcia z albumu</h1>
      </div>
      <div class="row-center">
        <hr>
      </div>
    </div>
      <TheSlider v-if="photos.length" :images="photos"/>
  </div>
</template>

<script>
import { getPhotos } from "../scripts/albumsApi"
import TheSlider from "../components/TheSlider.vue"
export default {
  components: {
    TheSlider
  },
  data(){
    return{
      photos: [],
    }  
  },
  methods: {
    async getPhotos(){
      this.photos = await getPhotos(+this.$route.params.id)
    }
  },
  mounted(){
    this.getPhotos();
  }  
}
</script>