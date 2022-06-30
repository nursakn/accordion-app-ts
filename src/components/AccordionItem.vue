<template>
  <article class="mb-2">
    <button
      @click="toggle(index)"
      class="flex justify-between w-full bg-blue-400 text-left p-2 rounded"
    >
      <h3>
        <slot v-if="!title" name="title" />
        {{ title }}
      </h3>
      <div class="flex gap-2">
        <slot name="buttons" />
        <button v-if="isOpen" @click="toggle">-</button>
        <button v-else @click="toggle">+</button>
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
export default class AccordionItem extends Vue {
  // eslint-disable-next-line no-unused-vars
  @Inject() readonly setIndex: (id: symbol) => void;
  @Inject() readonly toggle: (id: symbol) => void;
  @Inject() readonly getOpen: (id: symbol) => boolean;
  @InjectReactive() readonly reactive: { currentItem: symbol } | symbol[];
  @Prop({ type: String }) readonly title: string;

  index = Symbol();
  isOpen = false;

  @Watch("reactive", { deep: true, immediate: true })
  onReactiveChanged() {
    this.isOpen = this.getOpen(this.index);
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
