<template>
  <teleport to="body">
    <div v-if="open" class="backdrop" @click="$emit('close')" />
    <transition name="modal">
      <dialog v-if="open" open>
        <div>
          <div class="row-center">
            <span :class="iconClass"><font-awesome-icon :icon="icon" /> </span>
          </div>
          <div class="row-center">
            <h1>{{ msg }}</h1>
          </div>
          <div class="row-end">
            <button class="close-button" @click="$emit('close')">
              Zamknij
            </button>
            <slot />
          </div>
        </div>
      </dialog>
    </transition>
  </teleport>
</template>

<script>
export default {
  props: {
    open: {
      type: Boolean,
      required: true,
    },
    msg: {
      type: String,
      default: '',
    },
    iconClass: {
      type: String,
      default: 'success-icon',
    },
    icon: {
      type: String,
      default: 'fa-solid fa-check',
    },
  },
  emits: ['close'],
}
</script>

<style scoped>
@import './dialogStyle.css';
</style>
