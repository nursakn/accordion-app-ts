<!-- eslint-disable @typescript-eslint/ban-ts-comment -->
<template>
  <div v-show="isOpen" class="bottom-sheet" @click="dismiss">
    <div
      id="container"
      ref="container"
      class="bottom-sheet__container"
      :class="{
        'bottom-sheet__container--full': isFullScreen,
      }"
      :style="{
        height: height + 'px',
        transition: isAnimating
          ? `height ${animationTime}ms ease-in-out, border-top-right-radius ${animationTime}ms, border-top-left-radius ${animationTime}ms`
          : '',
      }"
    >
      <div
        ref="notch"
        class="bottom-sheet__notch"
        @mousedown="onMouseDown"
        @touchmove="onTouchMove"
        @touchend="onTouchEnd"
      >
        <p>-</p>
      </div>
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
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Component
export default class BottomSheet extends Vue {
  @Prop({ type: Array, default: [] }) snapPoints: ("auto" | number)[];

  @Prop({ type: Number, default: 0 }) defaultPoint: number;

  @Prop({ type: Number, default: 250 }) animationTime: number;

  @Prop({ type: Boolean, default: false }) autoHeight: boolean;

  height = 0;
  isDragging = false;
  isSwipingDown = false;
  isOpen = false;

  prevY: number;

  isAnimating = false;

  _snapPoints: number[];

  $refs!: {
    container: HTMLDivElement;
    notch: HTMLDivElement;
    header: HTMLDivElement;
    content: HTMLDivElement;
    footer: HTMLDivElement;
  };

  countContentHeight() {
    let contentHeight = this.$refs.content.firstElementChild?.clientHeight
      ? this.$refs.content.firstElementChild?.clientHeight
      : 0;

    contentHeight += this.$refs.notch.clientHeight;
    contentHeight += this.$refs.header.clientHeight;
    contentHeight += this.$refs.footer.clientHeight;
    return contentHeight;
  }

  resizeObserver: ResizeObserver;

  mounted() {
    // Get root element of content and then add up their heights in order to count auto-height
    this.resizeObserver = new ResizeObserver(() => {
      if (this.snapPoints) {
        const autoIndex = this.snapPoints.findIndex(
          (value) => value === "auto"
        );
        console.log("OBSERVER RUNNING");
        this._snapPoints[autoIndex] = this.countContentHeight();
        this.snapToPoint(autoIndex);
      }
    });

    const contentHeight = this.countContentHeight();

    if (this.$refs.content.firstElementChild) {
      this.resizeObserver.observe(this.$refs.content.firstElementChild);
    }

    this._snapPoints = this.snapPoints.map((point) => {
      if (point === "auto") {
        return contentHeight;
      }
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
    console.log("SNAP TO: ", value);
    const closest = this._snapPoints.reduce((prev, curr) => {
      return Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev;
    });
    this.height = closest;
    if (closest > 0) {
      this.isOpen = true;
    }
    this.isAnimating = true;
    return setTimeout(() => {
      this.isAnimating = false;
      if (value === 0) {
        this.isOpen = false;
      }
    }, this.animationTime);
  }

  snapToPoint(number: number) {
    console.log("SNAP TO POINT: ", number);
    this.snapTo(this._snapPoints[number]);
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
    if (this.isDragging) {
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

  dismiss() {
    this.snapTo(0);
  }

  get isFullScreen() {
    return this.height >= window.innerHeight;
  }
}
</script>

<style scoped>
.bottom-sheet {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  background-color: rgba(0, 0, 0, 0.5);

  cursor: pointer;
}
.bottom-sheet__container {
  display: flex;
  flex-direction: column;
  background: white;

  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;

  border-top-left-radius: 16px;
  border-top-right-radius: 16px;

  will-change: height;
}

.bottom-sheet__container--full {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.bottom-sheet__content {
  background-color: white;
  overflow: auto;
}

.bottom-sheet__header {
  position: sticky;
  background-color: white;
}

.bottom-sheet__footer {
  position: sticky;
  bottom: 0;
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
