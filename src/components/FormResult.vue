<template>
  <div class="width-100">
    <div v-for="res in Object.keys(result)" :key="res" class="row-space">
      <div class="row-center">
        <h3>{{ res }}</h3>
      </div>
      <div class="row-center">
        <p>{{ result[res] }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['result'],
}
</script>

<style scoped>
.width-100 {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  margin-top: 10px;
}

.row-center {
  width: 100%;
}
</style>
