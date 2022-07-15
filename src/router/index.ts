import Crud from "@/views/Crud.vue";
import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Simple from "@/views/Simple.vue";
import BottomSheetScreen from "@/views/BottomSheetScreen.vue";
import BottomSheetScreen2 from "@/views/BottomSheetScreen2.vue";

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
  {
    path: "/bottom",
    name: "bottom",
    component: BottomSheetScreen,
  },
  {
    path: "/bottom2",
    name: "bottom2",
    component: BottomSheetScreen2,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
