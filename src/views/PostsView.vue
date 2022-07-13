<template>
  <alert-dialog
    @close="closeDialog"
    :open="editDialog"
    :iconClass="iconClass"
    :icon="icon"
  >
    <div class="column-center" v-if="dialogMode">
      <h1>Edytowanie posta!</h1>
      <label for="edit-title">Tytuł</label>
      <input type="text" name="edit-title" v-model="newTitle" />
      <label for="edit-content">Zawartość</label>
      <textarea
        type="text"
        name="edit-content"
        v-model="newContent"
        rows="10"
      />
      <button @click="confirmEdit">Zapisz</button>
    </div>
    <div v-else class="column-center">
      <h2>{{ infoMsg }}</h2>
    </div>
  </alert-dialog>
  <alert-dialog
    @close="closeDialog"
    :open="deleteDialog"
    msg=""
    :iconClass="iconClass"
    :icon="icon"
  >
    <div class="column-center" v-if="dialogMode">
      <h1>Czy chcesz usunąć posta?</h1>
      <button @click="confirmDelete" class="delete-button">Usuń</button>
    </div>
    <div v-else class="column-center">
      <h2>{{ infoMsg }}</h2>
    </div>
  </alert-dialog>
  <div class="main">
    <div class="container">
      <div class="row-center">
        <h1>Posty</h1>
      </div>
      <hr />
      <TheFilters
        v-if="posts.length"
        :filters="filters"
        :toFilter="posts"
        storage="posts"
        @filter="onFilter"
      />
      <div
        v-for="(post, index) in postsToShow"
        :key="post.id"
        class="post-container"
      >
        <div class="card">
          <h2>{{ post.title }}</h2>
          <p>ID Użytkownika: {{ post.userId }}</p>
          <p>{{ post.body }}</p>
          <div class="row-space">
            <div class="row-start">
              <font-awesome-icon
                class="manage-icon"
                icon="fa-solid fa-trash"
                @click="deletePost(index)"
              />
              <font-awesome-icon
                class="manage-icon"
                icon="fa-regular fa-pen-to-square"
                @click="editPost(index)"
              />
            </div>
            <button @click="toogleComment(index)">
              Komentarze
              <font-awesome-icon
                :icon="`fa-solid fa-arrow-${
                  commentsToShow[index] ? 'down' : 'up'
                }-long`"
              />
            </button>
          </div>
        </div>
        <PostComments
          v-if="commentsToShow[index]"
          :comments="commentsToShow[index]"
          :commentId="post.id"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { deleteAxios, getAxios, updateAxios } from "../scripts/api";
import TheFilters from "../components/TheFilters.vue";
import PostComments from "../components/PostComments.vue";
export default {
  components: {
    TheFilters,
    PostComments,
  },
  data() {
    return {
      posts: [],
      postsToShow: [],
      commentsToShow: [],
      deleteDialog: false,
      editDialog: false,
      managePostId: 0,
      managePostUserId: 0,
      dialogMode: true,
      newTitle: "",
      newContent: "",
      icon: "",
      iconClass: "success-icon",
      infoMsg: "",
      postsApi: "https://jsonplaceholder.typicode.com/posts",
      filters: {
        rows: {
          first: [
            {
              placeholder: "Tytuł",
              tag: "input",
              type: "text",
              id: "title",
              value: "",
            },
            {
              placeholder: "ID Użytkownika",
              tag: "input",
              type: "number",
              id: "userId",
              value: "",
            },
          ],
          second: [
            {
              placeholder: "Zawartość",
              tag: "input",
              type: "text",
              id: "body",
              value: "",
            },
          ],
        },
        select: {
          options: [
            {
              value: "title",
              text: "Tytuł",
            },
            {
              value: "userId",
              text: "ID użytkownika",
            },
            {
              value: "body",
              text: "Zawartość",
            },
          ],
          id: "sortOption",
        },
      },
    };
  },
  methods: {
    async getPosts() {
      this.posts = await getAxios(this.postsApi);
      this.postsToShow = this.posts;
      this.commentsToShow = new Array(this.postsToShow.length).fill(false);
    },
    onFilter(posts) {
      this.postsToShow = posts;
      this.commentsToShow = new Array(this.postsToShow.length).fill(false);
    },
    deletePost(index) {
      this.icon = "";
      this.managePostId = this.postsToShow[index].id;
      this.managePostUserId = this.postsToShow[index].userId;
      this.dialogMode = true;
      this.deleteDialog = true;
    },
    editPost(index) {
      this.icon = "";
      this.dialogMode = true;
      this.managePostId = this.postsToShow[index].id;
      this.managePostUserId = this.postsToShow[index].userId;
      this.newTitle = this.postsToShow[index].title;
      this.newContent = this.postsToShow[index].body;
      this.editDialog = true;
    },
    closeDialog() {
      this.editDialog = false;
      this.deleteDialog = false;
    },
    confirmEdit() {
      updateAxios(`${this.postsApi}/${this.managePostId}`, {
        id: this.managePostId,
        title: this.newTitle,
        body: this.newContent,
        userId: this.managePostUserId,
      }).then((res) => {
        this.dialogMode = false;
        if (res) {
          this.icon = "fa-solid fa-check";
          this.iconClass = "success-icon";
          this.infoMsg = "Post został edytowany!";
        } else {
          this.icon = "fa-solid fa-exclamation";
          this.iconClass = "error-icon";
          this.infoMsg = "Coś poszło nie tak!";
        }
      });
    },
    confirmDelete() {
      deleteAxios(`${this.postsApi}/${this.managePostId}`).then((res) => {
        this.dialogMode = false;
        if (res) {
          this.icon = "fa-solid fa-check";
          this.iconClass = "success-icon";
          this.infoMsg = "Post został usunięty!";
        } else {
          this.icon = "fa-solid fa-exclamation";
          this.iconClass = "error-icon";
          this.infoMsg = "Coś poszło nie tak!";
        }
      });
    },
    async toogleComment(index) {
      if (!this.commentsToShow[index]) {
        const comments = await getAxios(
          `${this.postsApi}/${this.postsToShow[index].id}/comments`
        );
        this.commentsToShow[index] = comments;
      } else {
        this.commentsToShow[index] = false;
      }
    },
  },
  mounted() {
    this.getPosts();
  },
};
</script>

<style scoped>
.row-start {
  margin-top: 8px;
  gap: 10px;
}

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
}

.manage-icon:hover {
  font-size: 20px;
}

.delete-button {
  background-color: rgb(185, 0, 0);
  font-weight: bold;
  font-size: large;
}

.container {
  width: 40%;
}

.post-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card {
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
}

.card h2 {
  margin: 0;
}

.card p {
  margin-bottom: 10px;
}
</style>
