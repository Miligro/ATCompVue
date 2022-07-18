<template>
  <teleport to="body" v-if="editComponent">
    <div class="backdrop" @click="$emit('close')"></div>
    <transition name="modal">
      <dialog open>
        <component :item="item" :is="editComponent" @response="response" />
        <div class="row-end">
          <button @click="$emit('close')" class="close-button">Zamknij</button>
        </div>
      </dialog>
    </transition>
  </teleport>
</template>

<script>
import EditPost from '../EditPost.vue'
export default {
  components: { EditPost },
  props: {
    item: {
      type: Object,
      default: {},
    },
    editComponent: {
      type: String,
      required: true,
    },
  },
  emits: ['close', 'response'],
  methods: {
    response(...res) {
      this.$emit('response', ...res)
    },
  },
}
</script>

<style scoped>
@import './dialogStyle.css';
</style>
