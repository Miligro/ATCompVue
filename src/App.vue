<script>
import { RouterLink, RouterView } from "vue-router";

export default {
  components: {
    RouterView,
    RouterLink,
  },
  data() {
    return {
      navs: [
        {
          text: "Formularz",
          to: "/form",
          icon: "fa-brands fa-wpforms",
        },
        {
          text: "Posty",
          to: "/posts",
          icon: "fa-regular fa-message",
        },
        {
          text: "Albumy",
          to: "/albums",
          icon: "fa-regular fa-images",
        },
      ],
    };
  },
};
</script>

<template>
  <header>
    <nav class="head-nav">
      <RouterLink to="/"><h2>My page</h2></RouterLink>
      <a href="https://github.com/Miligro/ATCompVue">GitHub</a>
    </nav>
    <nav class="side-nav" id="side-nav">
      <RouterLink v-for="nav in navs" :key="nav.to" :to="nav.to">
        <div class="navigation-con main-page-nav">
          <p>{{ nav.text }}</p>
          <font-awesome-icon class="white-icon" :icon="nav.icon" />
        </div>
      </RouterLink>
    </nav>
  </header>
  <RouterView />
</template>

<style>
@import "@/assets/base.css";

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  margin-bottom: 40px;
}

h2 {
  margin-top: 10px;
}

a {
  text-decoration: none;
  color: rgb(255, 255, 255);
}

.white-icon {
  color: white;
}

.row-start,
.row-center,
.row-end,
.row-space {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

.row-end {
  justify-content: flex-end;
}

.row-center {
  justify-content: center;
}

.row-space {
  justify-content: space-between;
  gap: 10px;
  width: 100%;
}

.main {
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.container {
  width: 30%;
  display: flex;
  flex-direction: column;
}

button {
  cursor: pointer;
  margin-top: 8px;
  border: none;
  background-color: rgb(2, 184, 47);
  font-size: 15px;
  border-radius: 4px;
  padding: 5px;
  color: white;
}

.error-icon,
.ask-icon,
.success-icon {
  border: 3px solid red;
  border-radius: 50px;
  width: 100px;
  height: 100px;
  align-items: center;
  justify-content: center;
  display: inline-flex;
  color: red;
  font-size: 60px;
}

.ask-icon {
  border: 3px solid gray;
  color: gray;
}

.success-icon {
  border: 3px solid green;
  color: green;
}

.head-nav {
  background-color: #4c3c3c;
  height: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
  top: 0;
  width: 100%;
  position: fixed;
  justify-content: space-between;
  padding: 20px;
  /* border-bottom: 1px solid black; */
}

.head-nav a {
  width: 160px;
  text-align: center;
  justify-content: center;
}

.head-nav a h2 {
  margin: 0;
}

.side-nav {
  background-color: #5f4c4c;
  width: 200px;
  height: 100%;
  top: 60px;
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.side-nav a {
  width: 80%;
  text-decoration: none;
  color: white;
}

.navigation-con {
  margin-top: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 1rem;
  border-radius: 6px;
  color: black;
}

.navigation-con:hover {
  border: 2px solid rgb(0, 0, 0);
  cursor: pointer;
  color: rgb(0, 0, 0);
}

hr {
  color: black;
  width: 90%;
}

.main-page-navs {
  width: 20%;
}

.main-page-nav {
  border: 1px solid black;
  color: black;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-size: 20px;
}

.side-nav .main-page-nav {
  border: 1px solid rgb(255, 255, 255);
}

.side-nav .main-page-nav:hover {
  border: 2px solid rgb(255, 255, 255);
}

.side-nav p,
.side-nav i {
  color: white;
}

i:hover {
  scale: 1.1;
}
</style>
