<template>
  <div>
    <select v-model="currentLimit">
      <option :value="5">5</option>
      <option :value="10">10</option>
      <option :value="20">20</option>
      <option :value="50">50</option>
    </select>
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
      :key="currentLimit"
      @input="onPageChange"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { items as itemsArray, Item } from "@/items";
import TnPagination from "./pagination/tn-pagination.vue";
import routingService from "@/services/routingService";
import { Prop, Watch } from "vue-property-decorator";

@Component({
  components: {
    TnPagination,
  },
})
export default class ItemList extends Vue {
  @Prop({ type: String }) url: string | undefined;
  items: Item[] = itemsArray;
  currentPage = 1;
  currentLimit = 5;

  onPageChange(value: number) {
    if (this.url) {
      if (value === 1) {
        this.$router.replace({
          path: this.url,
        });
        return;
      }
      routingService.changeRouteParam(this, {
        page: value.toString(),
      });
      return;
    }
    this.currentPage = value;
  }

  @Watch("$route.params.page", { deep: true })
  onRoutePageChange(value: string) {
    if (value) {
      this.currentPage = +value;
      return;
    }
    this.currentPage = 1;
  }

  get shownItems() {
    const startingIndex = (this.currentPage - 1) * this.currentLimit;
    return this.items.slice(startingIndex, startingIndex + this.currentLimit);
  }
}
</script>

<style></style>
