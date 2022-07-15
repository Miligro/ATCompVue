<template>
  <div class="width-100">
    <div class="row-space">
      <div class="row-center">
        <h3>Imię:</h3>
      </div>
      <div class="row-center">
        <p>{{ result.firstName }}</p>
      </div>
    </div>
    <div class="row-space">
      <div class="row-center">
        <h3>Nazwisko:</h3>
      </div>
      <div class="row-center">
        <p>{{ result.lastName }}</p>
      </div>
    </div>
    <div class="row-space">
      <div class="row-center">
        <h3>Email:</h3>
      </div>
      <div class="row-center">
        <p>{{ result.email }}</p>
      </div>
    </div>
    <div class="row-space">
      <div class="row-center">
        <h3>Opis:</h3>
      </div>
      <div class="row-center">
        <p>{{ result.description }}</p>
      </div>
    </div>
    <div class="row-space">
      <div class="row-center">
        <h3>PESEL:</h3>
      </div>
      <div class="row-center">
        <p>{{ result.pesel }}</p>
      </div>
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

.row-center {
  width: 100%;
}
</style>
