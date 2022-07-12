<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <div class="main">
    <h1>Strona główna</h1>
    <hr />
    <div class="main-page-navs">
      <RouterLink to="/form">
        <div class="navigation-con main-page-nav" id="posts_btn">
          <p>Formularz</p>
          <font-awesome-icon icon="fa-brands fa-wpforms" />
        </div>
      </RouterLink>
      <RouterLink to="/posts">
        <div class="navigation-con main-page-nav" id="posts_btn">
          <p>Posty</p>
          <font-awesome-icon icon="fa-regular fa-message" />
        </div>
      </RouterLink>
      <RouterLink to="/albums">
        <div class="navigation-con main-page-nav" id="posts_btn">
          <p>Albumy</p>
          <font-awesome-icon icon="fa-regular fa-images" />
        </div>
      </RouterLink>
    </div>
  </div>
</template>

<style>
hr {
  width: 30%;
}

h1 {
  font-size: 50px;
}
</style>
