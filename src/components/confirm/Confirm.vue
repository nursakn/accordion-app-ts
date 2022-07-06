<template>
  <Modal :open="isOpen">
    <div class="bg-white flex flex-col">Hello World</div>
    <button @click="onDiscard">cancel</button>
    <button @click="onSubmit">ok</button>
  </Modal>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
// import { Prop } from "vue-property-decorator";
import Modal from "../Modal.vue";

import confirmService from "./confirm-service";

@Component({
  components: {
    Modal,
  },
})
export default class Confirm extends Vue {
  // @Prop({ type: Boolean, default: false }) open: boolean;

  isOpen = false;

  msg = "";
  okButtonText = "";
  discardButtonText = "";

  resolveFn = (v: boolean) => undefined;

  onDiscard() {
    this.resolveFn(false);
    this.isOpen = false;
  }

  onSubmit() {
    //
    this.resolveFn(true);
    this.isOpen = false;
  }

  onOpenCallback(options: any) {
    console.log("onOpenCallback", options);
    // setup options
    this.isOpen = true;

    this.resolveFn = options.resolve;
  }

  created() {
    confirmService.on("open", this.onOpenCallback);
  }

  beforeUnmount() {
    confirmService.off("open", this.onOpenCallback);
  }
}
</script>

<style></style>
