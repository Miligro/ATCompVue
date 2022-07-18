<template>
  <InformationDialog
    :open="open"
    :msg="msg"
    :icon="icon"
    :icon-class="iconClass"
    @close="$emit('close')"
  >
    <button @click="$emit('confirm')">Zatwierdź</button>
  </InformationDialog>
</template>

<script>
import InformationDialog from './InformationDialog.vue'
export default {
  components: {
    InformationDialog,
  },
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
  emits: ['close', 'confirm'],
}
</script>

<style scoped>
@import './dialogStyle.css';
</style>
