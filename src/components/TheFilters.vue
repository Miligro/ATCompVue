<template>
  <div id="filters-con"></div>
  <div class="row-space" v-for="row in filters.rows">
    <input
      v-for="filter in row"
      :key="filter.id"
      :id="filter.id"
      :type="filter.type"
      :placeholder="filter.placeholder"
      v-model="values[filter.id]"
    />
  </div>
  <div class="row-space">
    <button class="filter-button" @click="onFilter">Filtruj</button>
    <button class="reset-filters-button" @click="onResetFilters">
      Resetuj filtry
    </button>
    <select v-if="filters.select" v-model="sortOption" name="" id="">
      <option v-for="option in filters.select.options" :value="option.value">
        {{ option.text }}
      </option>
    </select>
    <button
      v-if="filters.select"
      type="button"
      class="sort-button"
      @click="onSort"
    >
      <font-awesome-icon :icon="icon" />
    </button>
  </div>
</template>

<script>
export default {
  props: ["filters", "toFilter"],
  emits: ["filter"],
  data() {
    return {
      asc: "fa-solid fa-arrow-up-long",
      desc: "fa-solid fa-arrow-down-long",
      icon: "fa-solid fa-arrow-up-long",
      values: [],
      order: "asc",
      sortOption: "title",
    };
  },
  methods: {
    onFilter() {
      let toReturn = this.toFilter;
      for (const key in this.filters.rows) {
        const row = this.filters.rows[key];
        for (const filter of row) {
          if (filter.type === "text") {
            toReturn = this.filterByText(
              toReturn,
              filter.id,
              this.values[filter.id]
            );
          } else if (filter.type === "number") {
            toReturn = this.filterByNum(
              toReturn,
              filter.id,
              this.values[filter.id]
            );
          }
        }
      }
      if (this.filters.select) {
        toReturn = toReturn.sort((a, b) => {
          if (this.order === "desc") {
            return a[this.sortOption] >= b[this.sortOption] ? 1 : -1;
          } else {
            return a[this.sortOption] <= b[this.sortOption] ? 1 : -1;
          }
        });
      }
      this.$emit("filter", toReturn);
    },
    onResetFilters() {
      this.$emit("filter", this.toFilter);
    },
    onSort() {
      if (this.order === "asc") {
        this.icon = this.desc;
        this.order = "desc";
      } else {
        this.icon = this.asc;
        this.order = "asc";
      }
      this.onFilter();
    },
    filterByText(toFilter, filterEl, filterBy) {
      if (filterBy) {
        toFilter = toFilter.filter(
          (el) => el[filterEl].toLowerCase().search(filterBy.toLowerCase()) >= 0
        );
      }
      return toFilter;
    },
    filterByNum(toFilter, filterEl, filterBy) {
      if (filterBy) {
        toFilter = toFilter.filter(
          (el) => el[filterEl].toString() === filterBy.toString()
        );
      }
      return toFilter;
    },
  },
};
</script>

<style scoped>
.filter-button,
.reset-filters-button {
  padding: 8px;
  width: 100%;
}

.sort-button {
  padding: 8px;
  background-color: gray;
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
  padding: 7px;
}

select {
  padding: 7px;
  margin-top: 8px;
}
</style>
