import Vue, { PluginObject, VueConstructor } from "vue";
import Confirm from "@/components/confirm/Confirm.vue";
import confirmService from "@/components/confirm/confirm-service";

export const confirmPlugin: PluginObject<any> = {
  install: function (Vue: VueConstructor<Vue>): void {
    Vue.component("confirm-modal", Confirm);
    Vue.prototype.$confirm = confirmService.confirm.bind(confirmService);
  },
};
