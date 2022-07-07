<template>
  <Modal :open="isOpen">
    <div class="bg-white flex flex-col text-center mb-4">
      {{ title ? title : "Confirm?" }}
    </div>
    <div class="flex justify-center gap-2">
      <button
        class="rounded h-8 w-20 bg-red-600 hover:bg-red-700 transition"
        @click="onSubmit"
      >
        <p class="a text-white">{{ ok ? ok : "ok" }}</p>
      </button>
      <button
        class="rounded h-8 w-20 bg-gray-100 hover:bg-gray-200 transition"
        @click="onDiscard"
      >
        {{ discard ? discard : "cancel" }}
      </button>
    </div>
  </Modal>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import confirmService, { IConfirmOptionsExtended } from "./confirm-service";
import Modal from "../Modal.vue";

@Component({
  components: {
    Modal,
  },
})
export default class Confirm extends Vue {
  isOpen = false;
  title = "";
  ok = "";
  discard = "";

  resolveFn = (value: boolean | PromiseLike<boolean>) => {
    return;
  };

  onDiscard() {
    this.resolveFn(false);
    this.isOpen = false;
  }

  onSubmit() {
    this.resolveFn(true);
    this.isOpen = false;
  }

  onOpenCallback(options: IConfirmOptionsExtended) {
    this.isOpen = true;
    this.title = options.msg;
    if (options.ok) {
      this.ok = options.ok;
    }
    if (options.discard) {
      this.discard = options.discard;
    }
    this.resolveFn = options.resolve;
  }

  mounted() {
    confirmService.on("open", this.onOpenCallback);
  }
}
</script>

<style></style>
