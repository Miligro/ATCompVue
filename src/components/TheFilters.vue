<template>
  <div id="filters-con"></div>
  <div class="row-space">
    <input type="text" placeholder="asd" />
    <input type="text" placeholder="zawartosc" />
    <input type="text" placeholder="tytul" />
  </div>
  <div class="row-space">
    <button class="filter-button" @click="onFilter">Filtruj</button>
    <button class="reset-filters-button" @click="onResetFilters">
      Resetuj filtry
    </button>
  </div>
</template>

<script>
export default {
  props: ["filters"],
  methods: {
    onFilter() {
      console.log("filter");
    },
    onResetFilters() {
      console.log("reset_filters");
    },
  },
  mounted() {
    const filtersCon = document.getElementById("filters-con");
    let rowEl = document.createElement("div");
    rowEl.setAttribute("class", "row-space");

    for (const key in this.filters) {
      const filter = this.filters[key];
      if (["number", "text"].includes(filter.type)) {
        const el = document.createElement("input");
        el.setAttribute("id", filter.id);
        el.setAttribute("placeholder", filter.placeholder);
        el.setAttribute("type", filter.type);
        el.setAttribute("class", "input-in");

        rowEl.appendChild(el);
        console.log(rowEl);
        if (rowEl.childElementCount === 3) {
          filtersCon.appendChild(rowEl);
          rowEl = document.createElement("div");
          rowEl.setAttribute("class", "row-space");
        }
      }
    }
  },
};
</script>

<style scoped>
button {
  padding: 8px;
  width: 100%;
}

.filter-button {
  background-color: #198bee;
}

.filter-button:hover {
  background-color: #0e7ddd;
}
.reset-filters-button {
  background-color: #dd2626;
}

.reset-filters-button:hover {
  background-color: #d40b0b;
}

input {
  margin-top: 8px;
  width: 100%;
  height: 30px;
  padding: 5px;
}
</style>
