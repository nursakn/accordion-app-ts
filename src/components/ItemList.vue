<template>
  <div>
    <div
      class="p-2 rounded flex bg-green-400 justify-between mb-2"
      v-for="(item, index) in shownItems"
      :key="index"
    >
      <p>{{ item.title }}</p>
      <p>{{ item.description }}</p>
    </div>
    <TnPagination
      :value="currentPage"
      :limit="currentLimit"
      :total="items.length"
      @change="onChange"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { items as itemsArray, Item } from "@/items";
import TnPagination from "./pagination/tn-pagination.vue";

@Component({
  components: {
    TnPagination,
  },
})
export default class ItemList extends Vue {
  items: Item[] = itemsArray;
  currentPage = 0;
  currentLimit = 10;

  onChange(value: number) {
    console.log("onChange: ", value);
    this.currentPage = value;
  }

  get shownItems() {
    console.log("CHANGED SHOWN");
    const startingIndex = this.currentPage * this.currentLimit;
    return this.items.slice(startingIndex, startingIndex + this.currentLimit);
  }
}
</script>

<style></style>
