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
    <select v-if="filters.select" v-model="values[filters.select.id]">
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
  props: ['filters', 'toFilter', 'storage'],
  emits: ['filter'],
  data() {
    return {
      asc: 'fa-solid fa-arrow-up-long',
      desc: 'fa-solid fa-arrow-down-long',
      icon: 'fa-solid fa-arrow-up-long',
      values: [],
      order: 'asc',
    }
  },
  methods: {
    onFilter() {
      this.saveStorage()
      let toReturn = this.toFilter
      for (const key in this.filters.rows) {
        const row = this.filters.rows[key]
        for (const filter of row) {
          if (filter.type === 'text') {
            toReturn = this.filterByText(
              toReturn,
              filter.id,
              this.values[filter.id]
            )
          } else if (filter.type === 'number') {
            toReturn = this.filterByNum(
              toReturn,
              filter.id,
              this.values[filter.id]
            )
          }
        }
      }
      if (this.filters.select) {
        toReturn = toReturn.sort((a, b) => {
          const sortOption = this.values[this.filters.select.id]
          if (this.order === 'desc') {
            return a[sortOption] >= b[sortOption] ? 1 : -1
          } else {
            return a[sortOption] <= b[sortOption] ? 1 : -1
          }
        })
      }
      this.$emit('filter', toReturn)
    },
    saveStorage() {
      localStorage.setItem(`${this.storage}_order`, this.order)

      if (this.filters.select) {
        localStorage.setItem(
          `${this.storage}_${this.filters.select.id}`,
          this.values[this.filters.select.id]
        )
      }
      for (const key in this.filters.rows) {
        const row = this.filters.rows[key]
        for (const filter of row) {
          if (this.values[filter.id]) {
            localStorage.setItem(
              `${this.storage}_${filter.id}`,
              this.values[filter.id]
            )
          }
        }
      }
    },
    onResetFilters() {
      localStorage.clear()
      this.checkStorage()
    },
    onSort() {
      if (this.order === 'asc') {
        this.icon = this.desc
        this.order = 'desc'
      } else {
        this.icon = this.asc
        this.order = 'asc'
      }
      this.onFilter()
    },
    filterByText(toFilter, filterEl, filterBy) {
      if (filterBy) {
        toFilter = toFilter.filter(
          (el) => el[filterEl].toLowerCase().search(filterBy.toLowerCase()) >= 0
        )
      }
      return toFilter
    },
    filterByNum(toFilter, filterEl, filterBy) {
      if (filterBy) {
        toFilter = toFilter.filter(
          (el) => el[filterEl].toString() === filterBy.toString()
        )
      }
      return toFilter
    },
    checkStorage() {
      if (this.filters.select) {
        this.values[this.filters.select.id] =
          this.filters.select.options[0].value
      }
      let value = localStorage.getItem(`${this.storage}_order`)
      if (value) {
        this.order = value
      } else {
        this.order = 'asc'
      }
      this.order === 'asc' ? (this.icon = this.asc) : (this.icon = this.desc)

      for (const key in this.filters.rows) {
        const row = this.filters.rows[key]
        for (const filter of row) {
          value = localStorage.getItem(`${this.storage}_${filter.id}`)
          if (value) {
            this.values[filter.id] = value
          } else {
            this.values[filter.id] = ''
          }
        }
      }
      this.onFilter()
    },
  },
  mounted() {
    this.checkStorage()
  },
}
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
