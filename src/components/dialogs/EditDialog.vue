<template>
  <teleport v-if="editComponent" to="body">
    <div class="backdrop" @click="$emit('close')" />
    <transition name="modal">
      <dialog open>
        <component :is="editComponent" :item="item" @response="response" />
        <div class="row-end">
          <button class="close-button" @click="$emit('close')">Zamknij</button>
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
      required: true,
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
