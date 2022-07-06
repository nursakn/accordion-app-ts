<template>
  <Modal :open="open">
    <div class="bg-white flex flex-col">Hello World</div>
  </Modal>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import Modal from "./Modal.vue";

@Component({
  components: {
    Modal,
  },
})
export default class Confirm extends Vue {
  @Prop(Boolean) open: boolean;
}
</script>

<style></style>
