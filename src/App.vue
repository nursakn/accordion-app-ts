<template>
  <div id="app" class="p-4">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/Crud">Crud</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Provide } from "vue-property-decorator";
import infrastructure from "./infrastructure";

@Component
export default class App extends Vue {
  @Provide() infra = infrastructure;
}
</script>

<style></style>
