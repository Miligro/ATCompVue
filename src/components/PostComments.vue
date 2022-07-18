<template>
  <div :id="'comments-' + commentsId" class="comments-card">
    <div v-for="comment in locallyComments" :key="comment.id" class="comment-card">
      <h3>{{ comment.name }}</h3>
      <p>{{ comment.body }}</p>
      <p class="small-font">
        {{ comment.email }}
      </p>
      <hr />
    </div>
  </div>
</template>

<script>
export default {
  props: ['comments', 'commentsId'],
  data() {
    return {
      locallyComments: null,
      content: null,
    }
  },
  watch: {
    comments() {
      if (this.comments) {
        this.locallyComments = this.comments
      }
      this.content.style.maxHeight = this.comments ? `${500 * this.comments.length}px` : 0
    },
  },
  mounted() {
    this.content = document.getElementById(`comments-${this.commentsId}`)
  },
}
</script>

<style scoped>
.comments-card {
  border-radius: 5px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  box-shadow: 3px 3px 3px rgb(83, 77, 77), -3px 3px 3px rgb(83, 77, 77);
  width: 90%;
  max-height: 0px;
  overflow: hidden;
  transition: max-height ease 0.8s;
  background-color: white;
}

.comment-card {
  margin-top: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 1rem;
  border-radius: 6px;
  color: black;
}

.comment-card {
  text-align: center;
  margin-top: 5px;
  border: none;
  color: black;
}

.comment-card p {
  margin-top: 10px;
  align-self: flex-start;
}

.comment-card hr {
  width: 100%;
  margin-top: 20px;
}

.small-font {
  font-size: small;
  font-weight: bold;
}
</style>
