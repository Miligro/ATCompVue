<template>
  <div class="main">
    <div class="container">
      <h1>Posty</h1>
      <hr />
      <TheFilters :filters="filters" :toFilter="posts" @filter="onFilter" />
      <div v-for="post in postsToShow" class="card">
        <h2>{{ post.title }}</h2>
        <p>ID Użytkownika: {{ post.userId }}</p>
        <p>{{ post.body }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { getAxios } from "../scripts/api";
import TheFilters from "../components/TheFilters.vue";
export default {
  components: {
    TheFilters,
  },
  data() {
    return {
      posts: [],
      postsToShow: [],
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
          id: "sort",
        },
      },
    };
  },
  methods: {
    async getPosts() {
      this.posts = await getAxios(this.postsApi);
      this.postsToShow = this.posts;
    },
    onFilter(posts) {
      this.postsToShow = posts;
    },
  },
  mounted() {
    this.getPosts();
  },
};
</script>

<style scoped>
.container {
  width: 40%;
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
