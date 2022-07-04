<template>
  <section>
    <button @click="fetchItems">
      <p>Refresh</p>
    </button>
    <p class="text-center" v-if="loading">Loading...</p>
    <Accordion>
      <AccordionItem v-for="(item, index) in itemList" :key="index">
        <template v-slot:title>{{ item.title }}</template>
        <template>{{ item.description }}</template>
        <template v-slot:buttons>
          <button @click.stop="removeItem(item.id)">Delete</button>
          <button @click.stop="openEdit(item.id)">Edit</button>
        </template>
      </AccordionItem>
    </Accordion>
    <button @click="openModal('Create')">Create Item</button>
    <Modal :open="isModalOpen" @close="isModalOpen = false">
      <Form :title="modalTitle" :item="editingItem" @submit="onFormSubmit" />
    </Modal>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import AccordionItem from "../components/AccordionItem.vue";
import Accordion from "../components/Accordion.vue";
import Form from "../components/Form.vue";
import { Inject } from "vue-property-decorator";
import { InfrastructureI } from "@/infrastructure";
import { IQnaItem } from "@/infrastructure/QNAService/types";
import Modal from "../components/Modal.vue";

@Component({
  components: {
    AccordionItem,
    Accordion,
    Form,
    Modal,
  },
})
export default class Crud extends Vue {
  @Inject() infra: InfrastructureI;
  itemList: IQnaItem[] = [];
  editingItem: IQnaItem = {
    id: 0,
    title: "",
    description: "",
  };
  isModalOpen = false;
  modalTitle = "";
  loading = false;

  mounted() {
    this.fetchItems();
  }

  async fetchItems() {
    this.loading = true;
    this.itemList = [];
    this.itemList = await this.infra.qna.fetchItems();
    this.loading = false;
    console.log("FETCHED");
  }

  openModal(type: "Edit" | "Create") {
    this.isModalOpen = true;
    this.modalTitle = type;
  }

  removeItem(index: number) {
    this.clearEditor();
    this.infra.qna.deleteItem(index);
    this.itemList = this.itemList.filter((item) => item.id !== index);
  }

  openEdit(index: number) {
    const item = this.itemList.find((item) => index === item.id);
    this.editingItem = item
      ? item
      : {
          id: 0,
          title: "",
          description: "",
        };
    this.openModal("Edit");
  }

  addItem(item: IQnaItem) {
    this.clearEditor();
    this.infra.qna.createItem(item);
    this.itemList.push(item);
    this.isModalOpen = false;
  }

  editItem(item: IQnaItem) {
    this.infra.qna.updateItem(item);
    const index = this.itemList.findIndex((el) => el.id === item.id);
    this.itemList[index] = item;
    this.clearEditor();
    this.isModalOpen = false;
  }

  onFormSubmit(item: IQnaItem) {
    if (item.id === 0) {
      this.addItem(item);
    } else {
      this.editItem(item);
    }
  }

  clearEditor() {
    this.editingItem = {
      id: 0,
      title: "",
      description: "",
    };
  }
}
</script>

<style></style>
