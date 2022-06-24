<template>
  <article>
    <button
      @click="toggle"
      class="flex justify-between w-full bg-blue-400 text-left p-2"
    >
      <h3>
        <slot name="title" />
      </h3>
      <div v-if="editable" class="flex gap-2">
        <button @click.stop="onDelete">Delete</button>
        <button @click.stop="onEdit">Edit</button>
        <span v-if="isOpen">-</span>
        <span v-else>+</span>
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
import { Emit, InjectReactive, Prop } from "vue-property-decorator";

@Component
export default class AccordionItem extends Vue {
  // eslint-disable-next-line no-unused-vars
  @InjectReactive() readonly setIndex!: (id: number) => void;
  @InjectReactive() readonly reactiveIndex!: { currentItem: number };

  @Prop({ default: 0 }) readonly index!: number;
  @Prop(Boolean) readonly editable: boolean | undefined;

  toggle() {
    this.setIndex(this.index);
  }

  @Emit()
  onDelete() {
    return this.index;
  }
  @Emit()
  onEdit() {
    return this.index;
  }

  //computed
  get isOpen() {
    return this.reactiveIndex.currentItem === this.index;
  }
}

// export default {
//   inject: ["setIndex", "reactiveIndex"],
//   name: "AccordionItem",
//   props: {
//     index: Number,
//     editable: Boolean,
//   },
//   methods: {
//     toggle() {
//       this.setIndex(this.index);
//     },
//     onDelete() {
//       this.$emit("delete", this.index);
//     },
//     onEdit() {
//       this.$emit("edit", this.index);
//     },
//   },
//   computed: {
//     isOpen: function () {
//       return this.reactiveIndex.currentItem === this.index;
//     },
//   },
// };
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
