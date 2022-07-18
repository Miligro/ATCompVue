<template>
  <header>
    <nav class="head-nav">
      <div :class="{ 'menu-button': true, 'menu-active': sideNavOpen }" @click="toggleSideNav">
        <div class="hamburger hamburger-bar" />
      </div>
      <div class="row-end">
        <RouterLink to="/login">
          <button class="head-nav-button">Logowanie</button>
        </RouterLink>
        <RouterLink to="/register">
          <button class="head-nav-button">Rejestracja</button>
        </RouterLink>
      </div>
    </nav>
    <nav id="side-nav" class="side-nav">
      <RouterLink v-for="nav in navs" :key="nav.to" :to="nav.to">
        <div class="navigation-con main-page-nav">
          <p>{{ nav.text }}</p>
          <font-awesome-icon class="white-icon" :icon="nav.icon" />
        </div>
      </RouterLink>
    </nav>
  </header>
  <EditDialog
    :edit-component="dialogStore.editComponent"
    :item="dialogStore.item"
    @close="dialogStore.closeDialogs"
    @response="dialogStore.response"
  />
  <QuestionDialog
    :open="dialogStore.questionDialog"
    :msg="dialogStore.msg"
    :icon="dialogStore.icon"
    :icon-class="dialogStore.iconClass"
    @close="dialogStore.closeDialogs"
    @confirm="dialogStore.confirm"
  />
  <InformationDialog
    :open="dialogStore.informationDialog"
    :icon="dialogStore.icon"
    :icon-class="dialogStore.iconClass"
    :msg="dialogStore.msg"
    @close="dialogStore.closeDialogs"
  />
  <RouterView />
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
import { useDialogStore } from './stores/dialog'
import EditDialog from './components/dialogs/EditDialog.vue'
import InformationDialog from './components/dialogs/InformationDialog.vue'
import QuestionDialog from './components/dialogs/QuestionDialog.vue'
export default {
  components: {
    RouterView,
    RouterLink,
    EditDialog,
    QuestionDialog,
    InformationDialog,
  },
  data() {
    return {
      sideNavOpen: true,
      navs: [
        {
          text: 'Formularz',
          to: '/form',
          icon: 'fa-brands fa-wpforms',
        },
        {
          text: 'Posty',
          to: '/posts',
          icon: 'fa-regular fa-message',
        },
        {
          text: 'Albumy',
          to: '/albums',
          icon: 'fa-regular fa-images',
        },
      ],
      dialogStore: useDialogStore(),
    }
  },
  mounted() {
    this.dialogStore.readState()
    const pageLoader = document.getElementById('page-loader')
    pageLoader.remove()
  },
  methods: {
    toggleSideNav() {
      const sideNav = document.getElementById('side-nav')
      if (this.sideNavOpen) {
        sideNav.style.width = '0px'
      } else {
        sideNav.style.width = '200px'
      }
      this.sideNavOpen = !this.sideNavOpen
    },
  },
}
</script>

<style>
@import '@/assets/base.css';

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  margin-bottom: 40px;
  background-color: rgba(214, 214, 214, 0.493);
  font-family: 'Helvetica', sans-serif;
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

.menu-button {
  top: 17px;
  height: 40px;
  width: 40px;
  cursor: pointer;
  /* text-align: center; */
  position: relative;
}

.menu-button:hover {
  transform: scale(1.05);
}

.hamburger {
  width: 40px;
  height: 5px;
  background-color: white;
}

.hamburger::after {
  top: 12px;
}

.hamburger::before {
  top: -12px;
}

.hamburger-bar {
  transition: 0.5s;
}

.hamburger-bar::before,
.hamburger-bar::after {
  content: '';
  width: 40px;
  height: 5px;
  background: #ffffff;
  transition: 0.5s;
  position: absolute;
}

.menu-active .hamburger-bar {
  background: rgba(0, 0, 0, 0);
}

.menu-button.menu-active .hamburger-bar::before {
  top: 0;
  transform: rotate(45deg);
}

.menu-button.menu-active .hamburger-bar::after {
  top: 0;
  transform: rotate(135deg);
}

.loading,
.loading-small {
  width: 100%;
  height: 100%;
  margin: 0;
  top: 0;
  display: flex;
  background-color: transparent;
  flex-direction: column;
  color: black;
  align-items: center;
  justify-content: center;
  position: fixed;
}

.loading-small {
  margin: 30px 0;
  position: relative;
}

.loading {
  width: 100%;
  height: 100%;
  top: 0;
  display: flex;
  background-color: white;
  flex-direction: column;
  color: black;
  align-items: center;
  justify-content: center;
  position: absolute;
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
  padding: 0 20px;
}

.container {
  width: 30%;
  display: flex;
  flex-direction: column;
  margin-top: 15px;
}

h1 {
  font-size: 45px;
}

textarea {
  font-family: 'Times New Roman', Times, serif;
  font-size: 18px;
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
  /* background-color: #4c3c3c; */
  /* background-color: #708090; */
  background-color: #65717e;

  height: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
  top: 0;
  width: 100%;
  position: fixed;
  justify-content: space-between;
  padding: 20px;
  z-index: 10;
  /* border-bottom: 1px solid black; */
}

.head-nav a {
  /* width: 160px; */
  /* margin: 0 8px; */
  text-align: center;
  justify-content: center;
  font-weight: bold;
  font-size: 18px;
}

.head-nav a h2 {
  margin: 0;
}

.head-nav-button {
  background-color: #2e343b;
  margin: 0 6px;
  padding: 10px;
}

.head-nav-button:hover {
  background-color: #000000;
}

.side-nav {
  /* background-color: #5f4c4c; */
  background-color: #708090;
  width: 200px;
  height: 100%;
  top: 60px;
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 10;
  overflow: hidden;
  transition: width 0.5s ease;
}

.side-nav a {
  width: 80%;
  text-decoration: none;
  color: rgb(255, 255, 255);
  /* background-color: #65717e; */
}

.navigation-con {
  margin-top: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 1rem;
  border-radius: 4px;
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
  /* border: 1px solid rgb(0, 0, 0); */
  border: none;
  background-color: #404852;
}

.side-nav .main-page-nav:hover p,
.side-nav .main-page-nav:hover .white-icon {
  color: rgb(202, 202, 202);

  /* border: 2px solid rgb(255, 255, 255); */
}

.side-nav p,
.side-nav i {
  color: rgb(255, 255, 255);
}

i:hover {
  scale: 1.1;
}
</style>
