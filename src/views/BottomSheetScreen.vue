<template>
  <div>
    Bottom Sheet Screen
    <br />
    <button @click="openBottomSheet">Open</button> <br />
    <button @click="closeBottomSheet">Close</button>
    <BottomSheet ref="bottomSheet" :snap-points="snapPoints">
      <template v-slot:header>
        <div>HEADER</div>
      </template>
      <template v-slot:footer>
        <div>FOOTER</div>
      </template>
      <template>
        <div>
          <button @click="contentExpanded = !contentExpanded">Open</button>
          <div v-if="contentExpanded">
            <p>BB</p>
            <br />
            <p>BB</p>
            <br />
            <p>BB</p>
            <br />
            <p>BB</p>
          </div>
          <p>AA</p>
          <br />
          <p>AA</p>
          <br />
          <p>AA</p>
          <br />
          <p>AA</p>
        </div>
      </template>
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
  snapPoints = [0, "auto", 200, 400, 600, window.innerHeight + 500];
  $refs: {
    bottomSheet: BottomSheet;
    elem: HTMLDivElement;
  };

  contentExpanded = false;

  openBottomSheet() {
    this.$refs.bottomSheet.snapTo(200);
  }

  closeBottomSheet() {
    this.$refs.bottomSheet.dismiss();
  }
}
</script>

<style></style>
