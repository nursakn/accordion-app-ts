<template>
  <div class="bottom-sheet">
    <div
      ref="container"
      class="bottom-sheet__container"
      :class="{ 'bottom-sheet__container--animating': isAnimating }"
      ghost-class="ghost"
      :style="{ height: height + 'px' }"
    >
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import Modal from "../Modal.vue";

@Component({
  components: {
    Modal,
  },
})
export default class BottomSheet extends Vue {
  @Prop({ type: Boolean, default: false }) open: boolean;
  snapPoints = [200, 400, 600];
  height = 200;
  isAnimating = false;

  $refs!: {
    container: HTMLDivElement;
  };

  mounted() {
    this.$refs.container.addEventListener("touchmove", this.onTouchMove);
    this.$refs.container.addEventListener("touchend", this.onTouchEnd);
  }

  beforeDestroy() {
    this.$refs.container.removeEventListener("touchmove", this.onTouchMove);
    this.$refs.container.removeEventListener("touchend", this.onTouchEnd);
  }

  onTouchMove(e: TouchEvent) {
    this.height = window.innerHeight - e.changedTouches[0].clientY;
  }

  onTouchEnd() {
    const closest = this.snapPoints.reduce((prev, curr) => {
      return Math.abs(curr - this.height) < Math.abs(prev - this.height)
        ? curr
        : prev;
    });
    this.isAnimating = true;
    this.height = closest;
    setTimeout(() => {
      this.isAnimating = false;
    }, 100);
  }
}
</script>

<style scoped>
.bottom-sheet {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.bottom-sheet__container {
  background: green;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
}

.bottom-sheet__container--animating {
  transition: height 100ms;
}
</style>
