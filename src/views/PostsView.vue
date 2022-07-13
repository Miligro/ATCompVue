<template>
  <div class="main">
    <div class="container">
      <h1>Posty</h1>
      <hr />
      <TheFilters :filters="filters" />
      <div v-for="post in posts" class="card">
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
      postsApi: "https://jsonplaceholder.typicode.com/posts",
      filters: [
        {
          placeholder: "Tytuł",
          type: "text",
          id: "title",
        },
        {
          placeholder: "ID Użytkownika",
          type: "number",
          id: "userId",
        },
        {
          placeholder: "Zawartość",
          type: "text",
          id: "body",
        },
        {
          type: "select",
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
      ],
    };
  },
  methods: {
    async getPosts() {
      this.posts = await getAxios(this.postsApi);
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
