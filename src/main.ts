import { createApp } from "vue";
import router from "@/router";
import store from "@/store";
import RouterComponent from "@/components/router-component/RouterComponent.vue";
import VueLazyLoad from "vue-lazyload";

createApp(RouterComponent)
  .use(store)
  .use(router)
  .use(VueLazyLoad)
  .mount("#app");
