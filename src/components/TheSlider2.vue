<template>
  <div class="row-center" id="slider-and-buttons">
    <font-awesome-icon
      v-if="imagesNum > 1"
      icon="fa-solid fa-angle-left"
      class="arrow-icon"
      @click="slideLeft"
    />
    <div class="slide">
      <img :src="currentImage.url" alt="image" :title="currentImage.title" />
    </div>
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
    };
  },
  computed: {
    currentImage() {
      return this.images[this.index];
    },
  },
  mounted() {
    this.imagesNum = this.images.length;
  },
  methods: {
    slideLeft() {
      if (this.index === 0) {
        this.index = this.imagesNum - 1;
      } else {
        this.index--;
      }
    },
    slideRight() {
      if (this.index === this.imagesNum - 1) {
        this.index = 0;
      } else {
        this.index++;
      }
    },
  },
};
</script>

<style scoped>
.row-center {
  gap: 10px;
}
.slide {
  margin-top: 20px;
  aspect-ratio: auto;
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
}

@media all and (max-width: 576px) {
  .arrow-icon {
    font-size: 25px;
  }
}
</style>
