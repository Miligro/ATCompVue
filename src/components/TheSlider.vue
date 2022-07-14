<template>
    <div class="row-space-slider">
    <font-awesome-icon v-if="imagesNum > 1" icon="fa-solid fa-angle-left large-icon" class="large-icon" @click="slideLeft"/>
    <div class="slider" id="slider">
        <div class="slides" id="slides">
            <div class="slide" v-for="image in images" :key="image.id">
                <img :src="image.url" alt="image" :title="image.title" :style="`max-height:${sliderHeight}px;max-width:${sliderWidth}px`">
            </div>
        </div>
    </div>
    <font-awesome-icon v-if="imagesNum > 1" icon="fa-solid fa-angle-right large-icon" class="large-icon" @click="slideRight"/>
    </div>
</template>

<script>
export default {
    props:
    {
        images: {
            type: Array,
            required: true,
        }
    },
    data(){
        return{
            sliderWidth: 500,
            sliderHeight: 500,
            imagesNum: 0,
        }
    },
    methods:{
        slideLeft(){
            const slides = document.getElementById("slides");
            slides.style.transition = `left 0.3s ease-out`;
            slides.style.left = `${this.sliderWidth}px`;

            setTimeout(() => {
                const lastImg = this.images.pop()
                this.images.unshift(lastImg)
                slides.style.transition = ``;
                slides.style.left = ``;
            }, 300);
        },
        slideRight(){
            const slides = document.getElementById("slides");
            slides.style.transition = `left 0.3s ease-out`;
            slides.style.left = `${-this.sliderWidth}px`;
            setTimeout(() => {
                const firstImg = this.images.shift();
                this.images.push(firstImg)
                slides.style.transition = ``;
                slides.style.left = ``;
            }, 300);
        }
    },
    mounted(){
        const slider = document.getElementById("slider");
        const slides = document.getElementById("slides");
        slider.style.height = `${this.sliderHeight}px`;
        slider.style.width = `${this.sliderWidth}px`;

        const lastImg = this.images.pop()
        this.images.unshift(lastImg)
        this.imagesNum = this.images.length;

        if(this.imagesNum > 1){
            slides.style.marginLeft = `-${this.sliderWidth}px`;
        }

        if(this.imagesNum === 2){
            this.imagesNum += 2;
            this.images.push({
                id: this.images[0].id + this.images[1].id + 1,
                title: this.images[0].title,
                url: this.images[0].url,
            })
            this.images.push({
                id: this.images[0].id + this.images[1].id + 2,
                title: this.images[1].title,
                url: this.images[1].url,
            })
        }

        slides.style.width = `${this.imagesNum * this.sliderWidth}px`;
    }
}
</script>

<style scoped>
.row-space-slider{
  display: flex;
  flex: 1 1;
  margin-top: 10px;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
  width: 55%;
}

.slider {
  position: relative;
  overflow: hidden;
  margin: 20px auto 0 auto;
  border-radius: 4px;
}

.slides {
  position: relative;
  margin: 0;
  padding: 0;
  list-style: none;
  left: 0px;
}

.slide {
  position: relative;
  display: block;
  float: left;
  margin: 0;
  padding: 0;
  background: #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
}

.large-icon{
    font-size: 50px;
}

.large-icon:hover{
    transform: scale(1.1);
}
</style>