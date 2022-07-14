<template>
  <teleport to="body">
    <div v-if="open" class="backdrop" @click="$emit('close')"></div>
    <transition name="modal">
      <dialog open v-if="open">
        <div>
          <div class="row-center">
            <span :class="iconClass"><font-awesome-icon :icon="icon" /> </span>
          </div>
          <div class="row-center">
            <h1>{{ msg }}</h1>
          </div>
          <slot> </slot>
          <div class="row-end">
            <button @click="$emit('close')" class="close-button">
              Zamknij
            </button>
          </div>
        </div>
      </dialog>
    </transition>
  </teleport>
</template>

<script>
export default {
  props: {
    open:{
        type: Boolean,
        required: true,
    },
    msg: {
       type: String,
        default: "",
    }, 
    iconClass: {
        type: String,
        default: "success-icon"
    }, 
    icon: {
        type: String,
        default: 'fa-solid fa-check'
    }},
  emits: ["close"],
};
</script>

<style scoped>
@import "./dialogStyle.css";
</style>
