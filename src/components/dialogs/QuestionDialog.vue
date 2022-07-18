<template>
  <teleport to="body">
    <div v-if="open" class="backdrop" @click="$emit('close')"></div>
    <transition name="modal">
      <dialog open v-if="open">
        <div>
          <div class="row-center">
            <span class="ask-icon"
              ><font-awesome-icon icon="fa-solid fa-question" />
            </span>
          </div>
          <div class="row-center">
            <h1>{{ msg }}</h1>
          </div>
          <slot> </slot>
          <div class="row-end">
            <button @click="$emit('close')" class="close-button">
              Zamknij
            </button>
            <button @click="$emit('confirm')">Zatwierdź</button>
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
  },
  emits: ['close', 'confirm'],
}
</script>

<style scoped>
@import './dialogStyle.css';
</style>
