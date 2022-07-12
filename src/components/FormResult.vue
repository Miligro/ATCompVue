<template>
  <div class="width-100">
    <div class="row-space">
      <h3>Imię:</h3>
      <p>{{ result.firstName }}</p>
    </div>
    <div class="row-space">
      <h3>Nazwisko:</h3>
      <p>{{ result.lastName }}</p>
    </div>
    <div class="row-space">
      <h3>Email:</h3>
      <p>{{ result.email }}</p>
    </div>
    <div class="row-space">
      <h3>Opis:</h3>
      <p>{{ result.description }}</p>
    </div>
    <div class="row-space">
      <h3>PESEL:</h3>
      <p>{{ result.pesel }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["result"],
};
</script>

<style scoped>
.width-100 {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  margin-top: 10px;
}
</style>
