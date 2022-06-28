<template>
  <article>
    <button
      @click="toggleOpen"
      class="flex justify-between w-full bg-blue-400 text-left p-2 rounded"
    >
      <h3>
        <slot v-if="!title" name="title" />
        {{ title }}
      </h3>
      <div class="flex gap-2">
        <slot name="buttons" />
        <button v-if="isOpen" @click="toggleOpen">-</button>
        <button v-else @click="toggleOpen">+</button>
      </div>
    </button>
    <Transition name="fadeHeight">
      <div class="bg-gray-300" v-if="isOpen">
        <p class="w-full">
          <slot />
        </p>
      </div>
    </Transition>
  </article>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Inject, InjectReactive, Prop, Watch } from "vue-property-decorator";

@Component
export default class AccordionItemV2 extends Vue {
  @Inject() readonly setIndex: (id: symbol) => void;
  @Inject() readonly toggle: (id: symbol) => void;
  @Inject() readonly getOpen: (id: symbol) => boolean;
  @InjectReactive() readonly reactive: { currentItem: symbol } | symbol[];
  @Prop({ type: String }) readonly title: string;

  index = Symbol();
  isOpen = false;

  toggleOpen() {
    if (this.toggle) {
      this.toggle(this.index);
    }
    this.isOpen = !this.isOpen;
  }

  @Watch("reactive", { deep: true, immediate: true })
  onReactiveChanged() {
    this.isOpen = this.getOpen(this.index);
    console.log("CHAGNES: " + this.isOpen);
  }
}
</script>

<style>
.fadeHeight-enter-active,
.fadeHeight-leave-active {
  transition: all 0.5s;
  max-height: 200px;
  opacity: 1;
}
.fadeHeight-enter,
.fadeHeight-leave-to {
  max-height: 0;
  opacity: 0;
}
</style>
