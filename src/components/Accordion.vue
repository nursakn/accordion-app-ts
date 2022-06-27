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

type ReactiveArrayT = {
  currentItem: symbol[];
};

@Component
export default class Accordion extends Vue {
  @Prop({ type: Boolean, default: false }) independent!: boolean;
  reactiveIndex: ReactiveT = { currentItem: Symbol() };
  reactiveArray: ReactiveArrayT = { currentItem: [] };

  @Provide() setIndex = (index: symbol) => {
    if (this.reactive.currentItem === index) {
      this.reactive.currentItem = Symbol();
    } else {
      this.reactive.currentItem = index;
    }
  };
  @ProvideReactive() toggle = (index: symbol) => {
    console.log("TOGGLING: " + this.independent);
    if (this.independent) {
      if (this.reactiveArray.currentItem.includes(index)) {
        this.reactiveArray.currentItem.filter((id) => id !== index);
      } else {
        console.log("PUSHHING");
        this.reactiveArray.currentItem.push(index);
      }
    } else {
      if (this.reactiveIndex.currentItem === index) {
        this.reactiveIndex.currentItem = Symbol();
      } else {
        this.reactiveIndex.currentItem = index;
      }
    }
  };
  @ProvideReactive() getOpen = (index: symbol) => {
    if (this.independent) {
      return this.reactiveArray.currentItem.includes(index);
    } else {
      return this.reactive.currentItem === index;
    }
  };
  @ProvideReactive() reactive = this.reactiveIndex;
}
</script>

<style></style>
