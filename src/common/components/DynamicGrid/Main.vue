<template>
    <div>
      <div class="content-fillter">
        <b-input v-model="filter" class="search sm-size" :placeholder="searchBox"></b-input>
      </div>
        <b-table
            class="dynamic-table"
            show-empty
            stacked="md"
            :fields="fields"
            :items="items"
            :filter="filter"
            :per-page="perPage"
            @filtered="onFiltered"
            :current-page="currentPage"
        ></b-table>
        <b-pagination
            v-if="items.length > 0"
            :total-rows="totalRows"
            :per-page="perPage"
            v-model="currentPage"
            class="my-0"
        />
    </div>
</template>

<script>
export default {
  props: {
    fields: Array,
    items: Array,
    searchBox: String
  },
  data() {
    return {
      filter: null,
      currentPage: 1,
      perPage: 25,
      totalRows: 0
    };
  },
  methods: {
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    }
  }
};
</script>

<style scoped>
.content-fillter{
  border: 1px solid #c2c2c2;
  padding-top: 10px;
  padding-left: 20px;
}
</style>
