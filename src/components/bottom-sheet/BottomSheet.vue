<template>
  <div
    ref="container"
    class="bottom-sheet__container"
    :class="{
      'bottom-sheet__container--full': isFullScreen,
      'bottom-sheet__container--animating': isAnimating,
    }"
    :style="{
      height: height + 'px',
      transition: isAnimating ? `height ${animationTime}ms ease-in-out` : '',
    }"
  >
    <div
      class="bottom-sheet__notch"
      @mousedown="onMouseDown"
      @touchmove="onTouchMove"
      @touchend="onTouchEnd"
    >
      <p>-</p>
    </div>
    <slot :open="open" :dismiss="dismiss" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Component
export default class BottomSheet extends Vue {
  @Prop({ type: Array, default: [] }) snapPoints: number[];

  @Prop({ type: Number, default: 0 }) defaultPoint: number;

  @Prop({ type: Number, default: 250 }) animationTime: number;

  @Prop({ type: Boolean, default: false }) autoHeight: boolean;

  height = 0;
  isDragging = false;
  isSwipingDown = false;

  prevY: number;

  isAnimating = false;

  _snapPoints: number[];

  $refs!: {
    container: HTMLDivElement;
  };

  mounted() {
    this._snapPoints = this.snapPoints.map((point) => {
      if (point > window.innerHeight) {
        return window.innerHeight;
      }
      return point;
    });
    if (this.defaultPoint) {
      this.snapTo(this.defaultPoint);
    }

    document.addEventListener("mouseup", this.onMouseUp);
  }

  snapTo(value: number) {
    const closest = this._snapPoints.reduce((prev, curr) => {
      return Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev;
    });
    this.height = closest;
    this.isAnimating = true;
    setTimeout(() => {
      this.isAnimating = false;
    }, this.animationTime);
  }

  onMouseDown() {
    this.isDragging = true;
    document.addEventListener("mousemove", this.onMouseMove);
  }

  onMouseMove(e: MouseEvent) {
    if (this.isDragging) {
      this.isSwipingDown = this.prevY - e.clientY < -20;
      this.prevY = e.clientY;
      this.height = window.innerHeight - e.clientY;
    }
  }

  onMouseUp() {
    this.isDragging = false;
    this.$refs.container.style.maxHeight = "100%";
    document.removeEventListener("mousemove", this.onMouseMove);
    if (this.isSwipingDown) {
      this.isSwipingDown = false;
      this.snapTo(0);
      return;
    }
    this.snapTo(this.height);
  }

  onTouchMove(e: TouchEvent) {
    this.isSwipingDown = this.prevY - e.changedTouches[0].clientY < -20;
    this.prevY = e.changedTouches[0].clientY;
    this.height = window.innerHeight - e.changedTouches[0].clientY;
  }

  onTouchEnd() {
    if (this.isSwipingDown) {
      this.isSwipingDown = false;
      this.snapTo(0);
      return;
    }
    this.snapTo(this.height);
  }

  open() {
    if (this.defaultPoint) {
      this.snapTo(this.defaultPoint);
      return;
    }
    this.snapTo(this._snapPoints[this._snapPoints.length - 1]);
  }

  dismiss() {
    this.snapTo(0);
  }

  get isFullScreen() {
    return this.height >= window.innerHeight;
  }
}
</script>

<style scoped>
.bottom-sheet__container {
  background: green;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  transition: border-top-right-radius 250ms, border-top-left-radius 250ms;
}

.bottom-sheet__container--full {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.bottom-sheet__container--animating {
  transition: height 250ms ease-in-out;
}

.bottom-sheet__notch {
  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
  user-select: none;

  height: 16px;
  width: 100%;
}
</style>
