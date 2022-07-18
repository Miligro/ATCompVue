<template>
  <div class="post-container">
    <div class="card">
      <h2>{{ post.title }}</h2>
      <p>ID Użytkownika: {{ post.userId }}</p>
      <p>{{ post.body }}</p>
      <div class="row-space">
        <div class="row-start">
          <font-awesome-icon class="manage-icon" icon="fa-solid fa-trash" @click="deletePost" />
          <font-awesome-icon
            class="manage-icon"
            icon="fa-regular fa-pen-to-square"
            @click="editPost"
          />
        </div>
        <button @click="toggleComments">
          Komentarze
          <font-awesome-icon :icon="`fa-solid fa-arrow-${comments ? 'down' : 'up'}-long`" />
        </button>
      </div>
    </div>
    <PostComments :comments="comments" :commentsId="post.id" />
  </div>
</template>

<script>
import PostComments from './PostComments.vue'
import { useDialogStore } from '../stores/dialog'
import { getComments, deletePost } from '../scripts/postsApi.js'
export default {
  components: {
    PostComments,
  },
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      comments: null,
      dialogStore: useDialogStore(),
    }
  },
  methods: {
    editPost() {
      this.dialogStore.setEditDialog('EditPost', this.post, this.response)
    },
    deletePost() {
      this.dialogStore.setQuestionDialog(
        'Czy chcesz usunąc post?',
        this.confirmDelete,
        'fa-solid fa-question',
        'error-icon'
      )
    },
    confirmDelete() {
      deletePost(this.post.id).then((res) => {
        if (res) {
          this.dialogStore.success('Usunięto post!')
        } else {
          this.dialogStore.error('Ups, coś poszło nie tak!')
        }
      })
    },
    response(res) {
      if (res) {
        this.dialogStore.success('Poprawnie edytowano post')
      } else {
        this.dialogStore.error('Nie udało się edytować posta!')
      }
    },
    async toggleComments() {
      if (!this.comments) {
        this.comments = await getComments(this.post.id)
      } else {
        this.comments = null
      }
    },
  },
}
</script>

<style scoped>
.row-start {
  margin-top: 8px;
  gap: 10px;
}

.manage-icon:hover {
  font-size: 20px;
}

.post-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card {
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 2rem;
  border: none;
  padding: 10px;
  border-radius: 10px;
  width: 100%;
  box-shadow: 0 0 8px black;
  text-align: center;
  color: black;
  background-color: #ffffffbb;
}

.card h2 {
  margin: 0;
}

.card p {
  margin-bottom: 10px;
}
</style>
