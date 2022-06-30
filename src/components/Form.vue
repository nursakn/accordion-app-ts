<template>
  <form class="flex flex-col gap-2" @submit.prevent="submit">
    <p class="font-bold text-xl text-center">{{ title }}</p>
    <label for="title">
      <p>Title:</p>
      <input id="title" v-model="itemTitle" />
    </label>
    <label for="description">
      <p>Description:</p>
      <input id="description" v-model="description" />
    </label>
    <input type="submit" />
    <p class="text-lg text-red-800 font-bold">{{ error }}</p>
  </form>
</template>

<script lang="ts">
import Component from "vue-class-component";
import Vue from "vue";
import { IQnaItem, IQnaItemCreate } from "@/infrastructure/QNAService/types";
import { Prop } from "vue-property-decorator";

@Component
export default class Edit extends Vue {
  @Prop(String) readonly title: string;
  @Prop({ type: Boolean, default: false }) readonly edit: boolean;
  @Prop() readonly item: IQnaItem | IQnaItemCreate;

  itemTitle = "";
  description = "";
  error = "";

  created() {
    if (this.edit) {
      this.itemTitle = this.item.title;
      this.description = this.item.description;
    }
  }

  submit() {
    if (this.itemTitle && this.description) {
      let changedItem;
      if (this.edit) {
        changedItem = this.item;
        changedItem.title = this.itemTitle;
        changedItem.description = this.description;
      } else {
        changedItem = {
          title: this.itemTitle,
          description: this.description,
        };
      }
      this.$emit("submit", changedItem);
    } else {
      this.error = "Please, fill all fields";
    }
  }
}
</script>

<style>
input {
  border: 1px solid lightblue;
  padding: 10px;
  width: 100%;
  border-radius: 4px;
  transition: 500ms;
}
input:focus {
  background-color: lightblue;
  outline: none;
}
</style>
