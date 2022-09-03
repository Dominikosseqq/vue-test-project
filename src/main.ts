import { createApp } from "vue";
import router from "@/router";
import store from "@/store";
import RouterComponent from "@/components/router-component/RouterComponent.vue";

createApp(RouterComponent).use(store).use(router).mount("#app");
