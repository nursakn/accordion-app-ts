<template>
  <div id="app" class="p-4">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/crud">Crud</router-link> |
      <router-link to="/bottom">Bottom sheet</router-link> |
      <router-link to="/bottom2">Bottom sheet 2</router-link>
    </nav>
    <router-view />
    <confirm-modal :open="isConfirmOpen" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Provide } from "vue-property-decorator";
import createInfrastructure from "./infrastructure";

@Component
export default class App extends Vue {
  Infrastructure = createInfrastructure(window.localStorage);
  isConfirmOpen = true;
  @Provide() infra = this.Infrastructure;
  @Provide() openConfirm = () => {
    this.isConfirmOpen = true;
  };
}
</script>

<style></style>
