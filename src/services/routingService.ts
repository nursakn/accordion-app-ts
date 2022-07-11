import { Dictionary, Route } from "vue-router/types/router";

class RoutingServiceClass {
  constructor() {
    if (RoutingServiceClass._instance) {
      return RoutingServiceClass._instance;
    }
    RoutingServiceClass._instance = this;
  }

  changeRouteParam(
    _this: Vue,
    params: Dictionary<string>
  ): Promise<void | Route> {
    return _this.$router.replace({
      name: _this.$route.name ? _this.$route.name : "",
      params,
    });
  }

  private static _instance: RoutingServiceClass | null = null;
}

const rountingService = new RoutingServiceClass();

export default rountingService;
