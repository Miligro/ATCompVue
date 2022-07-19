<template>
  <div id="slider-and-buttons" class="row-center">
    <font-awesome-icon
      v-if="imagesNum > 1"
      icon="fa-solid fa-angle-left"
      class="arrow-icon"
      @click="slideLeft"
    />
    <div class="slide" v-if="imagesNum" :class="{ 'slide-two': imagesNum > 1 }">
      <img
        :src="firstImage?.url"
        alt="image"
        :title="firstImage?.title"
        id="image-1"
        :class="{ 'image-1': imagesNum > 1, 'img-transparent': imgShow }"
      />
      <img
        :src="secondImage?.url"
        alt="image"
        :title="secondImage?.title"
        id="image-2"
        :class="{ 'image-2': true, 'img-transparent': !imgShow }"
      />
    </div>
    <div v-else><h1 class="no-photos">Brak zdjęć w albumie</h1></div>
    <font-awesome-icon
      v-if="imagesNum > 1"
      icon="fa-solid fa-angle-right"
      class="arrow-icon"
      @click="slideRight"
    />
  </div>
</template>

<script>
export default {
  props: {
    images: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      index: 0,
      imagesNum: 0,
      firstImage: null,
      secondImage: null,
      imgShow: 0,
    }
  },
  mounted() {
    this.imagesNum = this.images.length
    this.firstImage = this?.images[0]
    this.secondImage = this?.images[1]
  },
  methods: {
    slideLeft() {
      if (this.index === 0) {
        this.index = this.imagesNum - 1
      } else {
        this.index--
      }
      this.setImage()
    },
    slideRight() {
      if (this.index === this.imagesNum - 1) {
        this.index = 0
      } else {
        this.index++
      }
      this.setImage()
    },
    setImage() {
      this.imgShow = !this.imgShow

      if (this.imgShow) {
        this.secondImage = this.images[this.index]
      } else {
        this.firstImage = this.images[this.index]
      }
    },
  },
}
</script>

<style scoped>
.row-center {
  gap: 10px;
}
.slide {
  margin-top: 20px;
  aspect-ratio: auto;
}
.slide-two {
  position: relative;
}
.arrow-icon {
  font-size: 50px;
}

.arrow-icon:hover {
  transform: scale(1.1);
}

img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 1s ease;
}

.image-1 {
  position: absolute;
}

.image-2 {
  position: relative;
}

.img-transparent {
  opacity: 0;
}

.no-photos {
  margin-top: 50%;
  font-size: 60px;
}

@media all and (max-width: 576px) {
  .arrow-icon {
    font-size: 25px;
  }
}
</style>
