import { IConfirmOptions } from "./components/confirm/confirm-service";
import Vue from "vue";

declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}
declare module "vue/types/vue" {
  interface Vue {
    $confirm: (msg: string, options?: IConfirmOptions) => Promise<boolean>;
  }
}
