<template>
  <div class="column-center">
    <h1>Edytowanie posta</h1>
    <label for="edit-title">Tytuł</label>
    <input type="text" name="edit-title" v-model="title" />
    <label for="edit-content">Zawartość</label>
    <textarea type="text" name="edit-content" v-model="content" rows="10" />
    <button @click="confirmEdit">Zapisz</button>
  </div>
</template>

<script>
import { updatePost } from '../scripts/postsApi'
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  emits: ['response', 'save'],
  data() {
    return {
      title: '',
      content: '',
      saveItem: null,
    }
  },
  mounted() {
    this.title = this.item.title
    this.content = this.item.body
    this.saveItem = {
      title: this.title,
      body: this.content,
      id: this.item.id,
      userId: this.item.userId,
    }
  },
  watch: {
    title(newTitlte) {
      this.saveItem.title = newTitlte
      this.$emit('save', this.saveItem)
    },
    content(newContent) {
      this.saveItem.body = newContent
      this.$emit('save', this.saveItem)
    },
  },
  methods: {
    confirmEdit() {
      updatePost({
        id: this.item.id,
        title: this.title,
        body: this.content,
        userId: this.item.userId,
      }).then((res) => {
        this.$emit('response', res)
      })
    },
  },
}
</script>

<style scoped>
.column-center {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.column-center button {
  width: 100%;
}

label {
  margin-top: 8px;
  margin-bottom: 4px;
}

input,
textarea {
  width: 100%;
  padding: 5px;
  font-size: 20px;
}

button {
  font-size: 20px;
}
</style>
