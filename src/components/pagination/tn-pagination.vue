<template>
  <div class="tn-pagination">
    <div class="tn-pagination__inner">
      <div class="tn-pagination__arrow tn-pagination__arrow_left">
        <IconArrow />
      </div>
      <div class="tn-pagination__button">1</div>
      <div class="tn-pagination__divider"></div>
      <div class="tn-pagination__button">4</div>
      <div class="tn-pagination__button tn-pagination__button_active">5</div>
      <div class="tn-pagination__button">6</div>
      <div class="tn-pagination__divider"></div>
      <div class="tn-pagination__button">10</div>
      <div
        class="tn-pagination__arrow tn-pagination__arrow_right tn-pagination__arrow_disabled"
      >
        <IconArrow />
      </div>
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
  @Prop() value: number;
  @Prop() limit: number;
  @Prop() total: number;

  onClick() {
    this.$emit("input", 5);
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

@media (min-width: 1200px) {
  /*  */
}
</style>
