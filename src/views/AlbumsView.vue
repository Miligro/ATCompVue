<template>
  <div class="main">
    <div class="container">
      <div class="row-center">
        <h1>Albumy</h1>
      </div>
      <div class="row-center">
        <hr>
      </div>
      <TheFilters
        v-if="albums.length"
        :filters="filters"
        :toFilter="albums"
        storage="albmus"
        @filter="onFilter"
      />
      <div class="card" v-for="album in albums" :key="album.id">
        <RouterLink :to="`${$route.path}/${album.id}`" class="card-as-btn">
          <h2>{{ album.title }}</h2>
          <p>ID Użytkownika: {{ album.userId }}</p>
          <p>{{ album.body }}</p>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script>
import TheFilters from "../components/TheFilters.vue";
import { getAlbums } from "../scripts/albumsApi"
export default {
  components: {
    TheFilters,
  },
  data() {
    return {
      albums: [],
      albumsToShow: [],
      albmusApi: "https://jsonplaceholder.typicode.com/albums",
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
          ],
          id: "sortOption",
        },
      },
    };
  },
  methods: {
    async getAlbmus() {
      this.albums = await getAlbums();
      this.albumsToShow = this.albums;
    },
    onFilter(albums) {
      this.albumsToShow = albums;
    },
  },
  mounted() {
    this.getAlbmus();
  },
};
</script>

<style scoped>
.card-as-btn {
  cursor: pointer;
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
.card-as-btn h2 {
  margin-top: 0px;
  margin-bottom: 0;
}
</style>
