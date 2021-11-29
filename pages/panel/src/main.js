import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import installElementPlus from "./plugins/element";

createApp(App).use(store).use(installElementPlus).mount("#app");
