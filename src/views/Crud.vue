<template>
  <section>
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
    <button @click="openModal('create')">Create Item</button>
    <Modal :open="modalOpen" @close="modalOpen = false">
      <Form
        :title="'Edit'"
        v-if="isEditing"
        :item="editingItem"
        @submit="submitEdit"
        edit
      />
      <Form v-else :title="'Create'" @submit="addItem" />
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
import { IQnaItem, IQnaItemCreate } from "@/infrastructure/QNAService/types";
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
  isEditing = false;
  editingItem: IQnaItem = {
    id: 0,
    title: "",
    description: "",
  };
  modalOpen = false;

  mounted() {
    this.fetchItems();
  }

  async fetchItems() {
    this.itemList = await this.infra.qna.fetchItems();
    console.log("FETCHED");
  }

  openModal(type: "edit" | "create") {
    this.modalOpen = true;
    this.isEditing = type === "edit" ? true : false;
  }

  addItem(item: IQnaItemCreate) {
    this.clearEditor();
    this.infra.qna.createItem(item).then(() => this.fetchItems());
    this.modalOpen = false;
  }

  removeItem(index: number) {
    this.clearEditor();
    this.infra.qna.deleteItem(index).then(() => this.fetchItems());
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
    this.openModal("edit");
  }

  submitEdit(object: IQnaItem) {
    this.infra.qna.updateItem(object).then(() => this.fetchItems());
    this.clearEditor();
    this.modalOpen = false;
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
</script>

<style></style>
