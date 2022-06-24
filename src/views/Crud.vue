<template>
  <section>
    <Accordion>
      <AccordionItem
        v-for="(item, index) in itemList"
        :key="index"
        :index="item.id"
        :editable="true"
        v-on:on-delete="removeItem"
        v-on:on-edit="openEdit"
      >
        <template v-slot:title>{{ item.title }}</template>
        <template>{{ item.description }}</template>
      </AccordionItem>
    </Accordion>
    <form class="pb-3 flex flex-col gap-2" @submit.prevent="addItem()">
      <label for="title">
        title
        <input id="title" v-model="title" />
      </label>
      <label for="description">
        description
        <input id="description" v-model="description" />
      </label>
      <input type="submit" />
    </form>
    <p class="text-red-800 font-bold">{{ error }}</p>
    <Edit v-if="isEditing" :item="editingItem" v-on:edit-submit="submitEdit" />
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import AccordionItem from "../components/AccordionItem.vue";
import Accordion from "../components/Accordion.vue";
import Edit from "../components/Edit.vue";
import { ItemT } from "../types";

@Component({
  components: {
    AccordionItem,
    Accordion,
    Edit,
  },
})
class Crud extends Vue {
  itemList: ItemT[] = [];
  title = "";
  description = "";
  error = "";
  isEditing = false;
  editingItem: ItemT = {
    id: 0,
    title: "",
    description: "",
  };
  addItem() {
    this.clearEditor();
    if (this.title && this.description) {
      this.itemList.push({
        id: Math.floor(Math.random() * 1000000),
        title: this.title,
        description: this.description,
      });
      this.error = "";
    } else {
      this.error = "Fill all fields";
    }
  }
  removeItem(index: number) {
    this.clearEditor();
    this.itemList = this.itemList.filter((item) => index !== item.id);
  }
  openEdit(index: number) {
    this.isEditing = true;
    const item = this.itemList.find((item) => index === item.id);
    this.editingItem = item
      ? item
      : {
          id: 0,
          title: "",
          description: "",
        };
  }
  submitEdit(object: ItemT) {
    const id = this.itemList.findIndex((item) => object.id === item.id);
    console.log("SUBMIT: " + id + JSON.stringify(object));
    const tempArray = [...this.itemList];
    if (id !== -1) {
      tempArray[id] = object;
    }
    this.itemList = tempArray;
    this.clearEditor();
  }
  clearEditor() {
    this.isEditing = false;
    this.editingItem = {
      id: 0,
      title: "",
      description: "",
    };
  }
}

export default Crud;

// export default {
//   components: { Accordion, AccordionItem, Edit },
//   name: "Crud",
//   data() {
//     return {
//       itemList: [],
//       title: "",
//       description: "",
//       error: "",
//       isEditing: false,
//       editingItem: {},
//     };
//   },
//   methods: {
//     addItem() {
//       this.clearEditor();
//       if (this.title && this.description) {
//         this.itemList.push({
//           id: Math.floor(Math.random() * 1000000),
//           title: this.title,
//           description: this.description,
//         });
//         this.error = "";
//       } else {
//         this.error = "Fill all fields";
//       }
//     },
//     removeItem(index) {
//       this.clearEditor();
//       this.itemList = this.itemList.filter((item) => index !== item.id);
//     },
//     openEdit(index) {
//       this.isEditing = true;
//       this.editingItem = this.itemList.find((item) => index === item.id);
//     },
//     submitEdit(object) {
//       const id = this.itemList.findIndex((item) => object.id === item.id);
//       console.log("SUBMIT: " + id + JSON.stringify(object));
//       const tempArray = [...this.itemList];
//       if (id !== -1) {
//         tempArray[id] = object;
//       }
//       this.itemList = tempArray;
//       this.clearEditor();
//     },
//     clearEditor() {
//       this.isEditing = false;
//       this.editingItem = {};
//     },
//   },
// };
</script>

<style></style>
