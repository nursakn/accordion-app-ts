<template>
  <div>
    Bottom Sheet Screen
    <br />
    <div class="flex gap-2 mb-4">
      <button class="button" @click="openBottomSheet1">Open</button>
      <button class="button button--red" @click="closeBottomSheet1">
        Close
      </button>
    </div>

    <div class="flex gap-2">
      <button class="button" @click="openBottomSheet2">Open</button>
      <button class="button button--red" @click="closeBottomSheet2">
        Close
      </button>
    </div>

    <TestBox :count="50" />

    <BottomSheet ref="bottomSheet1" :snap-points="snapPoints" name="BS-1">
      <template v-slot:header>
        <div>HEADER</div>
      </template>
      <template v-slot:footer>
        <div>FOOTER</div>
      </template>
      <template>
        <TestBox :count="5" />
      </template>
    </BottomSheet>

    <BottomSheet ref="bottomSheet2" :snap-points="snapPoints" name="BS-2">
      <template>
        <button class="button" @click="isShownSublist = !isShownSublist">
          toggle sublist
        </button>
        <TransitionCollapse>
          <TestBox v-if="isShownSublist" :count="3" />
        </TransitionCollapse>
        <TestBox :count="5" />
      </template>
    </BottomSheet>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import BottomSheet from "@/components/bottom-sheet/BottomSheet.vue";
import TestBox from "@/components/test-box.vue";
import TransitionCollapse from "../components/transitions/transition-collapse.vue";

@Component({
  components: {
    BottomSheet,
    TestBox,
    TransitionCollapse,
  },
})
export default class BottomSheetScreen extends Vue {
  snapPoints = ["auto", 200, 400, 600, window.innerHeight + 500];
  $refs: {
    bottomSheet1: BottomSheet;
    bottomSheet2: BottomSheet;
    elem: HTMLDivElement;
  };

  contentExpanded = false;

  isShownSublist = false;

  openBottomSheet1() {
    this.$refs.bottomSheet1.open();
  }

  closeBottomSheet1() {
    this.$refs.bottomSheet1.dismiss();
  }

  openBottomSheet2() {
    this.$refs.bottomSheet2.open();
  }

  closeBottomSheet2() {
    this.$refs.bottomSheet2.dismiss();
  }
}
</script>

<style>
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
