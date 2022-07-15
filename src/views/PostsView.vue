<template>
  <div class="main">
    <div class="container">
      <div class="row-center">
        <h1>Posty</h1>
      </div>
      <div class="row-center">
        <hr />
      </div>
      <TheFilters
        v-if="postsToShow"
        :filters="filters"
        :toFilter="posts"
        storage="posts"
        @filter="onFilter"
      />
      <div class="loading-small" v-else>
        <TheLoader />
      </div>
      <PostCard v-for="post in postsToShow" :key="post.id" :post="post" />
    </div>
  </div>
</template>

<script>
import { getPosts } from "../scripts/postsApi";
import TheFilters from "../components/TheFilters.vue";
import PostCard from "../components/PostCard.vue";
export default {
  components: {
    TheFilters,
    PostCard,
  },
  data() {
    return {
      posts: null,
      postsToShow: null,
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
      this.posts = await getPosts();
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
</style>
