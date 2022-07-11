import Crud from "@/views/Crud.vue";
import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Simple from "@/views/Simple.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "home",
    component: Simple,
  },
  {
    path: "/crud?page=:page?",
    name: "crud",
    component: Crud,
    alias: "/crud",
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
