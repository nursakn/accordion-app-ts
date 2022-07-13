<template>
  <div>
    Bottom Sheet Screen
    <br />
    <button @click="openBottomSheet">Open</button> <br />
    <button @click="closeBottomSheet">Close</button>
    <BottomSheet auto-height ref="bottomSheet" :snap-points="snapPoints">
      <p>AA</p>
      <br />
      <p>AA</p>
      <br />
      <p>AA</p>
      <br />
      <p>AA</p>
    </BottomSheet>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import BottomSheet from "@/components/bottom-sheet/BottomSheet.vue";

@Component({
  components: {
    BottomSheet,
  },
})
export default class BottomSheetScreen extends Vue {
  snapPoints = [0, 200, 400, 600, window.innerHeight + 500];
  $refs: {
    bottomSheet: BottomSheet;
  };

  openBottomSheet() {
    this.$refs.bottomSheet.open();
  }

  closeBottomSheet() {
    this.$refs.bottomSheet.dismiss();
  }
}
</script>

<style></style>
