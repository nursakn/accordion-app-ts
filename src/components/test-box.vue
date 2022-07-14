<template>
  <div class="test-box">
    <div v-for="item in rows" :key="`tbr-${item}`" class="test-box__row">
      Row :: {{ item + 1 }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class TestBox extends Vue {
  @Prop({ default: 10 }) count: number;

  get rows() {
    return Array.from(Array(this.count)).map((el, idx) => idx);
  }
}
</script>

<style scoped>
.test-box {
  position: relative;
  user-select: none;

  padding: 10px;
}

.test-box__row {
  /* height: 20px; */
  padding: 10px;

  font-size: 16px;
  line-height: 20px;

  border-bottom: 1px solid silver;
}
</style>
