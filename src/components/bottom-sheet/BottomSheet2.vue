<template>
  <div class="bottom-sheet">
    <div class="bottom-sheet__bg" />
    <div
      class="bottom-sheet__container"
      :style="{ transform: `translateY(${currentTranslate}px)` }"
      @touchmove.prevent="onTouchMove"
      @touchend.prevent="onTouchEnd"
    >
      <div ref="body" class="bottom-sheet__body">
        <div ref="header" class="bottom-sheet__header">
          <slot name="header" />
        </div>
        <div ref="content" class="bottom-sheet__content">
          <slot />
        </div>
        <div ref="footer" class="bottom-sheet__footer">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { initSnapPoints } from "./bottom-sheet";

@Component
export default class BottomSheet2 extends Vue {
  @Prop({ type: Array, default: [] }) snapPoints: ("auto" | number)[];

  _snapPoints: number[];

  currentTranslate = 0;

  previousTouchY: number | null = null;

  $refs!: {
    body: HTMLDivElement;
  };

  mounted() {
    this._snapPoints = initSnapPoints(
      this.snapPoints,
      this.$refs.body.clientHeight
    );
  }

  getMovement(movementY: number) {
    if (this.previousTouchY) {
      return movementY - this.previousTouchY;
    }
    return movementY;
  }

  onTouchMove(e: TouchEvent) {
    const touch = e.touches[0];

    if (this.previousTouchY) {
      const tempTranslate =
        this.currentTranslate + this.getMovement(touch.clientY);

      this.currentTranslate = tempTranslate > 0 ? tempTranslate : 0;
    }

    this.previousTouchY = touch.clientY;
  }

  onTouchEnd() {
    this.previousTouchY = null;
    this.snapTo(this.currentTranslate);
  }

  snapTo(value: number) {
    const tempValue = this.getDistanceFromBottom(value);

    const closest = this._snapPoints.reduce((prev, curr) => {
      return Math.abs(curr - tempValue) < Math.abs(prev - tempValue)
        ? curr
        : prev;
    });

    this.currentTranslate = this.getDistanceFromBottom(closest);
  }

  getDistanceFromBottom(value: number) {
    return window.innerHeight - value;
  }
}
</script>

<style scoped>
.bottom-sheet {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  z-index: 10;
}
.bottom-sheet__bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  --bottom-sheet-opacity: 0.5;

  background-color: rgba(0, 0, 0, var(--bottom-sheet-opacity));
  pointer-events: none;
}

.bottom-sheet__container {
  display: flex;
  flex-direction: column;
  background: white;

  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  margin: auto;
  max-width: 800px;

  padding: 0 16px;

  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
}
</style>
