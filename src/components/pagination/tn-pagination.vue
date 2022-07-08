<template>
  <div class="tn-pagination">
    <div class="tn-pagination__inner">
      <button
        class="tn-pagination__arrow tn-pagination__arrow_left"
        :class="{ 'tn-pagination__arrow_disabled': isFirstPage }"
        @click="onArrowClick(-1)"
      >
        <IconArrow />
      </button>
      <button
        v-if="!isFirstPage"
        class="tn-pagination__button"
        @click="onClick(0)"
      >
        1
      </button>
      <div v-if="isLeftDividerShown" class="tn-pagination__divider" />
      <button
        v-for="item in prevItems"
        :key="Math.random() + item"
        class="tn-pagination__button"
        @click="onClick(value + item - 2)"
      >
        {{ value + item - 1 }}
      </button>
      <div class="tn-pagination__button tn-pagination__button_active">
        {{ value + 1 }}
      </div>
      <button
        v-for="item in nextItems"
        :key="Math.random() + item"
        class="tn-pagination__button"
        @click="onClick(item + value + 1)"
      >
        {{ value + item + 2 }}
      </button>
      <div v-if="isRightDividerShown" class="tn-pagination__divider" />
      <button
        v-if="!isLastPage"
        class="tn-pagination__button"
        @click="onClick(pagesCount - 1)"
      >
        {{ pagesCount }}
      </button>
      <button
        class="tn-pagination__arrow tn-pagination__arrow_right"
        :class="{ 'tn-pagination__arrow_disabled': isLastPage }"
        @click="onArrowClick(1)"
      >
        <IconArrow />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import IconArrow from "./icon-arrow.vue";

@Component({
  components: {
    IconArrow,
  },
})
export default class TnPagination extends Vue {
  @Prop({ type: Number }) value: number;
  @Prop({ type: Number }) limit: number;
  @Prop({ type: Number }) total: number;

  pagesCount = 0;

  isDesktop = false;

  created() {
    this.pagesCount = Math.ceil(this.total / this.limit);
    this.onResize();
    window.addEventListener("resize", this.onResize);
  }

  onResize() {
    console.log(window.innerWidth);
    if (window.innerWidth > 768) {
      this.isDesktop = true;
      return;
    }
    this.isDesktop = false;
  }

  onClick(value: number) {
    console.log(value);
    this.$emit("change", value);
  }

  onArrowClick(value: number) {
    this.$emit("change", this.value + value);
  }

  get prevItems(): number[] {
    if (this.value <= 1) {
      return [];
    }
    if (this.isDesktop) {
      if (this.value <= 2) {
        return [1];
      }
      return [0, 1];
    }
    return [1];
  }

  get nextItems(): number[] {
    if (this.value >= this.pagesCount - 2) {
      return [];
    }
    if (this.isDesktop) {
      if (this.value >= this.pagesCount - 3) {
        return [0];
      }
      return [0, 1];
    }
    return [0];
  }

  get isFirstPage() {
    return this.value === 0;
  }

  get isLastPage() {
    return this.value + 1 === this.pagesCount;
  }

  get isLeftDividerShown() {
    if (this.isDesktop) {
      return this.value > 3;
    }
    return this.value > 2;
  }

  get isRightDividerShown() {
    if (this.isDesktop) {
      return this.value < this.pagesCount - 4;
    }
    return this.value < this.pagesCount - 3;
  }
}
</script>

<style scoped>
.tn-pagination {
  display: flex;
  justify-content: center;

  position: relative;
  user-select: none;

  --ui-white: #fff;
  --ui-green: #14a664;
  --ui-stroke: #e2e4eb;
}

.tn-pagination__inner {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  gap: 5px;
}

.tn-pagination__button {
  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;
  width: 50px;
  height: 50px;
  border-radius: 14px;

  font-weight: 600;
  font-size: 15px;
  line-height: 1;

  cursor: pointer;

  transition: 200ms;
}

.tn-pagination__button:hover {
  background-color: var(--ui-stroke);
}

.tn-pagination__button.tn-pagination__button_active {
  background-color: var(--ui-green);
  color: var(--ui-white);
}

.tn-pagination__divider {
  display: flex;
  align-items: center;
  justify-content: center;
}

.tn-pagination__divider:before {
  content: "";
  display: block;
  position: relative;

  width: 12px;
  height: 1px;

  background-color: var(--ui-stroke);
}

.tn-pagination__arrow {
  width: 24px;
  height: 24px;
  font-size: 24px;
  line-height: 0;
  color: var(--ui-green);
  cursor: pointer;
}

.tn-pagination__arrow_disabled {
  color: var(--ui-stroke);
  pointer-events: none;
}

.tn-pagination__arrow_right {
  transform: rotate(-180deg);
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

@media screen and (min-width: 768px) {
  .tn-pagination__inner {
    width: fit-content;
    min-width: 520px;
    gap: 10px;
  }
}
</style>
