<template>
  <div class="tn-pagination">
    <!-- Pagination if pages are enough to show them fully - just buttons -->
    <div v-if="isContentFull" class="tn-pagination__inner">
      <button
        v-for="item in pagesCount"
        :key="item"
        class="tn-pagination__button"
        :class="{ 'tn-pagination__button_active': item === value }"
        @click="goToPage(item)"
      >
        {{ item }}
      </button>
    </div>
    <!-- Pagination if pages are not enough to show them fully - arrows and dividers -->
    <div v-else class="tn-pagination__inner">
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
        @click="goToPage(1)"
      >
        1
      </button>
      <div v-if="isLeftDividerShown" class="tn-pagination__divider" />
      <button
        v-for="item in prevItems"
        :key="`pgb-prev-${item}`"
        class="tn-pagination__button"
        @click="goToPage(value + item - 2)"
      >
        {{ value + item - 2 }}
      </button>
      <div class="tn-pagination__button tn-pagination__button_active">
        {{ value }}
      </div>
      <button
        v-for="item in nextItems"
        :key="`pgb-next-${item}`"
        class="tn-pagination__button"
        @click="goToPage(value + item)"
      >
        {{ value + item }}
      </button>
      <div v-if="isRightDividerShown" class="tn-pagination__divider" />
      <button
        v-if="!isLastPage"
        class="tn-pagination__button"
        @click="goToPage(pagesCount)"
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

const MIN_WIDTH_DESKTOP = 768;

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

  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  }

  onResize() {
    if (window.innerWidth > MIN_WIDTH_DESKTOP) {
      this.isDesktop = true;
      return;
    }
    this.isDesktop = false;
  }

  goToPage(value: number) {
    this.$emit("input", value);
  }

  onArrowClick(value: number) {
    this.$emit("input", this.value + value);
  }

  get prevItems(): number[] {
    if (this.value <= 2) {
      return [];
    }
    if (this.isDesktop) {
      if (this.value <= 3) {
        return [1];
      }
      return [0, 1];
    }
    return [1];
  }

  get nextItems(): number[] {
    if (this.value >= this.pagesCount - 1) {
      return [];
    }
    if (this.isDesktop) {
      if (this.value >= this.pagesCount - 2) {
        return [1];
      }
      return [1, 2];
    }
    return [1];
  }

  get isFirstPage() {
    return this.value === 1;
  }

  get isLastPage() {
    return this.value === this.pagesCount;
  }

  get isLeftDividerShown(): boolean {
    if (this.isDesktop) {
      if (this.pagesCount <= 5) {
        return false;
      }
      return this.value > 4;
    }
    if (this.pagesCount <= 3) {
      return false;
    }
    return this.value > 3;
  }

  get isRightDividerShown(): boolean {
    if (this.isDesktop) {
      if (this.pagesCount <= 5) {
        return false;
      }
      return this.value < this.pagesCount - 3;
    }
    if (this.pagesCount <= 3) {
      return false;
    }
    return this.value < this.pagesCount - 2;
  }

  get isContentFull(): boolean {
    if (this.isDesktop && this.pagesCount <= 5) {
      return true;
    }
    if (this.pagesCount <= 3) {
      return true;
    }
    return false;
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
  justify-content: center;
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
