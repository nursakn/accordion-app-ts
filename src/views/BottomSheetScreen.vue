<template>
  <div>
    Bottom Sheet Screen
    <BottomSheet>Hello</BottomSheet>
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
export default class BottomSheetScreen extends Vue {}
</script>

<style></style>
