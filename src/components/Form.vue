<template>
  <form class="flex flex-col gap-2" @submit.prevent="submit">
    <p class="font-bold text-xl text-center">{{ title }}</p>
    <label for="title">
      <p>Title:</p>
      <input id="title" v-model="formData.title" />
    </label>
    <label for="description">
      <p>Description:</p>
      <input id="description" v-model="formData.description" />
    </label>
    <input type="submit" />
    <p class="text-lg text-red-800 font-bold">{{ error }}</p>
  </form>
</template>

<script lang="ts">
import Component from "vue-class-component";
import Vue from "vue";
import { IQnaItem } from "@/infrastructure/QNAService/types";
import { Prop } from "vue-property-decorator";

@Component
export default class Edit extends Vue {
  @Prop(String) readonly title: string;
  @Prop({ type: Boolean, default: false }) readonly edit: boolean;
  @Prop() readonly item: IQnaItem;

  formData = {
    id: 0,
    title: "",
    description: "",
  };

  error = "";

  created() {
    if (this.item.id !== 0) {
      this.formData = Object.assign(this.formData, this.item);
    }
  }

  submit() {
    if (this.validate()) {
      this.$emit("submit", this.formData);
    } else {
      this.error = "Please, fill all fields";
    }
  }

  validate(): boolean {
    return !!(this.formData.title && this.formData.description);
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
