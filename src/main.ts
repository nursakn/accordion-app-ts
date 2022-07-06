import "@/assets/tailwind.css";
import Vue from "vue";
import App from "./App.vue";
import { confirmPlugin } from "./plugins/confirmPlugin";
import router from "./router";

Vue.config.productionTip = false;

Vue.use(confirmPlugin);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
