<template>
  <div>
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Provide, ProvideReactive } from "vue-property-decorator";

type ReactiveT = {
  currentItem: symbol;
};

@Component
export default class Accordion extends Vue {
  @Prop({ type: Boolean, default: false }) independent!: boolean;
  reactiveIndex: ReactiveT = { currentItem: Symbol() };
  reactiveArray: symbol[] = [];

  @Provide() setIndex = (index: symbol) => {
    if (this.reactiveIndex.currentItem === index) {
      this.reactiveIndex.currentItem = Symbol();
    } else {
      this.reactiveIndex.currentItem = index;
    }
  };

  @Provide() toggle(index: symbol) {
    if (this.$props.independent) {
      if (this.reactiveArray.includes(index)) {
        this.reactiveArray = this.reactiveArray.filter((id) => id !== index);
        this.reactive = this.reactiveArray;
      } else {
        this.reactiveArray.push(index);
        this.reactive = this.reactiveArray;
      }
    } else {
      if (this.reactiveIndex.currentItem === index) {
        this.reactiveIndex.currentItem = Symbol();
      } else {
        this.reactiveIndex.currentItem = index;
      }
    }
  }

  @Provide() getOpen(index: symbol) {
    if (this.$props.independent) {
      return this.reactiveArray.includes(index);
    } else {
      return this.reactiveIndex.currentItem === index;
    }
  }

  @ProvideReactive() reactive = this.$props.independent
    ? this.reactiveArray
    : this.reactiveIndex;
}
</script>

<style></style>
