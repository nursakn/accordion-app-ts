<template>
  <form class="flex flex-col gap-2" @submit.prevent="submit">
    <p class="font-bold">Editor</p>
    <label for="title">
      <input id="title" v-model="title" />
    </label>
    <label for="description">
      <input id="description" v-model="description" />
    </label>
    <input type="submit" />
  </form>
</template>

<script lang="ts">
import Component from "vue-class-component";
import Vue from "vue";
import { ItemT } from "@/types";
import { Prop } from "vue-property-decorator";

@Component
export default class Edit extends Vue {
  @Prop() readonly item!: ItemT;

  title = this.item.title;
  description = this.item.description;
  submit() {
    this.$emit("edit-submit", {
      id: this.item.id,
      title: this.title,
      description: this.description,
    });
  }
}
// export default {
//   name: "Edit",
//   props: {
//     item: {},
//   },
//   data() {
//     return {
//       title: this.item.title,
//       description: this.item.description,
//     };
//   },
//   methods: {
//     submit() {
//       this.$emit("edit-submit", {
//         id: this.item.id,
//         title: this.title,
//         description: this.description,
//       });
//     },
//   },
// };
</script>

<style></style>
