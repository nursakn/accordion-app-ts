<template>
  <div>
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { ProvideReactive } from "vue-property-decorator";

@Component
export default class Accordion extends Vue {
  reactive = { currentItem: 0 };

  @ProvideReactive() setIndex = (index: number) => {
    if (this.reactive.currentItem === index) {
      this.reactive.currentItem = 0;
    } else {
      this.reactive.currentItem = index;
    }
  };
  // @ProvideReactive
  @ProvideReactive() reactiveIndex = this.reactive;
}
</script>

<style></style>
