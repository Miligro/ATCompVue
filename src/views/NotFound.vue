<template>
  <div class="main">
    <h1>Nie znaleziono strony!</h1>
    <hr />
    <button @click="$router.go(-1)">Powrót</button>
  </div>
</template>

<style scoped>
button {
  padding: 10px;
  width: 20%;
  font-size: larger;
  background-color: gray;
}
</style>
