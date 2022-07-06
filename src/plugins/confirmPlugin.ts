import Vue, { PluginObject, VueConstructor } from "vue";
import Confirm from "@/components/Confirm.vue";

export const confirmPlugin: PluginObject<any> = {
  install: function (Vue: VueConstructor<Vue>): void {
    Vue.component("confirm-modal", Confirm);
    Vue.prototype.$confirm = function () {
      console.log("HELLO");
    };
  },
};
