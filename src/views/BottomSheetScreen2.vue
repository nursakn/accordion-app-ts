<template>
  <div>
    <BottomSheet2 :snapPoints="snapPoints">
      <template v-slot:header>
        <div>HEADER</div>
      </template>
      <template v-slot:footer>
        <div>FOOTER</div>
      </template>
      <template>
        <TestBox :count="5" />
      </template>
    </BottomSheet2>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import BottomSheet2 from "@/components/bottom-sheet/BottomSheet2.vue";
import TestBox from "@/components/test-box.vue";

@Component({
  components: {
    BottomSheet2,
    TestBox,
  },
})
export default class BottomSheetScreen2 extends Vue {
  snapPoints = [0, "auto", 200, 400, 600, window.innerHeight];

  isShownSublist = false;

  toggleSublist() {
    console.log("CLICK");
    this.isShownSublist = !this.isShownSublist;
  }
}
</script>

<style scoped>
.button {
  position: relative;
  padding: 5px 10px;
  border-radius: 5px;
  background-color: #531de7;
  color: #fff;
}

.button--red {
  background-color: #a20000;
}
</style>
