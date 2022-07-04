<template>
  <div
    v-if="open"
    class="absolute top-0 right-0 bottom-0 left-0 bg-transparent-black flex justify-center items-center"
    @click.self="close"
  >
    <div class="w-6/12 bg-white rounded p-5">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Component
export default class Modal extends Vue {
  @Prop({ type: Boolean, default: false }) readonly open: boolean;

  close() {
    this.$emit("close");
  }
}
</script>

<style></style>
