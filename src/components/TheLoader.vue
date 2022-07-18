<template>
  <h2>Wczytywanie</h2>
  <div class="loading-items">
    <div class="loading-item-1" />
    <div class="loading-item-2" />
    <div class="loading-item-3" />
    <div class="loading-item-4" />
    <div class="loading-item-5" />
    <div class="loading-item-6" />
    <div class="loading-item-7" />
    <div class="loading-item-8" />
  </div>
</template>

<script></script>

<style scoped>
.loading-items {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3px;
  background-color: transparent;
}

.loading-item-1,
.loading-item-2,
.loading-item-3,
.loading-item-4,
.loading-item-5,
.loading-item-6,
.loading-item-7,
.loading-item-8 {
  height: 10px;
  width: 10px;
  animation: loading-animation 1.6s linear infinite;
  color: black;
  background-color: black;
  opacity: 0;
  border-radius: 5px;
}

.loading-item-2 {
  animation-delay: 0.2s;
  opacity: 0.125;
}

.loading-item-3 {
  animation-delay: 0.4s;
  opacity: 0.25;
}

.loading-item-4 {
  animation-delay: 0.6s;
  opacity: 0.375;
}

.loading-item-5 {
  animation-delay: 0.8s;
  opacity: 0.5;
}

.loading-item-6 {
  animation-delay: 1s;
  opacity: 0.625;
}

.loading-item-7 {
  animation-delay: 1.2s;
  opacity: 0.75;
}

.loading-item-8 {
  animation-delay: 1.4s;
  opacity: 0.875;
}

@keyframes loading-animation {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
