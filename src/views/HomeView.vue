<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <div class="main">
    <div class="container">
      <h1>Strona główna</h1>
      <hr />
      <div class="main-page-navs">
        <RouterLink to="/form">
          <div class="navigation-con main-page-nav">
            <p>Formularz</p>
            <font-awesome-icon icon="fa-brands fa-wpforms" />
          </div>
        </RouterLink>
        <RouterLink to="/posts">
          <div class="navigation-con main-page-nav">
            <p>Posty</p>
            <font-awesome-icon icon="fa-regular fa-message" />
          </div>
        </RouterLink>
        <RouterLink to="/albums">
          <div class="navigation-con main-page-nav">
            <p>Albumy</p>
            <font-awesome-icon icon="fa-regular fa-images" />
          </div>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main-page-navs {
  width: 80%;
}

hr {
  width: 80%;
}
</style>
