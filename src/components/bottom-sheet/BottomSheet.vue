<!-- eslint-disable @typescript-eslint/ban-ts-comment -->
<template>
  <transition name="fade">
    <div v-show="isOpen" class="bottom-sheet" @mousedown.self="dismiss">
      <div class="bottom-sheet__bg"></div>
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
          @mousedown.prevent="onMouseDown"
          @touchmove.prevent="onTouchMove"
          @touchend.prevent="onTouchEnd"
        ></div>
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
  </transition>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { throttle } from "lodash";

@Component
export default class BottomSheet extends Vue {
  @Prop({ type: Array, default: [] }) snapPoints: ("auto" | number)[];

  @Prop({ type: Number, default: 0 }) defaultPoint: number;

  @Prop({ type: Number, default: 250 }) animationTime: number;

  @Prop({ type: Boolean, default: false }) autoHeight: boolean;

  @Prop({ type: Boolean, default: false }) background: boolean;

  @Prop({ type: String, default: "noname" }) name: string;

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
    body: HTMLDivElement;
  };

  countContentHeight() {
    let contentHeight = 0;

    contentHeight += this.$refs.notch.clientHeight;
    contentHeight += this.$refs.body.clientHeight;
    return contentHeight;
  }

  resizeObserver: ResizeObserver;

  mounted() {
    console.log("BottomSheet::mounted");

    // Get root element of content and then add up their heights in order to count auto-height
    this.resizeObserver = new ResizeObserver(
      throttle(
        () => {
          if (this.snapPoints) {
            const autoIndex = this.snapPoints.findIndex(
              (value) => value === "auto"
            );
            console.log("OBSERVER RUNNING", this.name);
            this._snapPoints[autoIndex] = this.countContentHeight();
            this.snapToPoint(autoIndex);
          }
        },
        this.animationTime * 2,
        {
          leading: true,
          trailing: false,
        }
      )
    );

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

    document.addEventListener("mouseup", this.onMouseUp);
    document.addEventListener("mousemove", this.onMouseMove);
  }

  beforeDestroy() {
    document.removeEventListener("mousemove", this.onMouseMove);
  }

  snapTo(value: number): Promise<true> {
    console.log("SNAP TO: ", value);
    const closest = this._snapPoints.reduce((prev, curr) => {
      return Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev;
    });
    this.height = closest;
    if (closest > 0) {
      this.isOpen = true;
    }
    this.isAnimating = true;
    return new Promise((resolve) => {
      setTimeout(() => {
        this.isAnimating = false;
        resolve(true);
      }, this.animationTime);
    });
  }

  snapToPoint(number: number): Promise<true> {
    console.log("SNAP TO POINT: ", this._snapPoints);
    return this.snapTo(this._snapPoints[number]);
  }

  onMouseDown() {
    this.isDragging = true;
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

      if (this.isSwipingDown) {
        this.dismiss();
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
      return this.dismiss();
    }
    this.snapTo(this.height);
  }

  open() {
    if (this.isOpen) {
      return;
    }

    if (this.defaultPoint) {
      return this.snapToPoint(this.defaultPoint);
    }

    this.snapToPoint(1);
  }

  dismiss() {
    if (!this.isOpen) {
      return;
    }
    this.isSwipingDown = false;
    this.snapTo(0).then(() => {
      this.isOpen = false;
    });
  }

  get isFullScreen() {
    return this.height >= window.innerHeight;
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
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
  margin: auto;
  max-width: 800px;

  padding: 0 16px;

  border-top-left-radius: 16px;
  border-top-right-radius: 16px;

  will-change: height;
}

.bottom-sheet__container--full {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.bottom-sheet__body {
  position: relative;

  background-color: white;
  overflow: auto;
}

.bottom-sheet__content {
  background-color: white;
  overflow: hidden;
}

.bottom-sheet__header {
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 5;
}

.bottom-sheet__footer {
  position: sticky;
  bottom: 0;
  background-color: white;
  z-index: 5;
}

.bottom-sheet__notch {
  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;
  height: 16px;
  min-height: 16px;
  width: 100%;

  cursor: pointer;
  user-select: none;
  z-index: 1;
}
.bottom-sheet__notch:before {
  content: "";
  display: block;
  position: relative;

  width: 53px;
  height: 5px;

  border-radius: 5px;
  background-color: #e2e4eb;
  z-index: 6;
}
.bottom-sheet__notch:after {
  content: "";
  display: block;
  position: absolute;

  top: -10px;
  left: 0;
  right: 0;
  bottom: -5px;

  background-color: transparent;
}
</style>
