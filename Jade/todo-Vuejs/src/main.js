import { createApp } from "vue";
import App from "./App.vue";
// import "./assets/style.css";
import "./assets/scss/style.scss";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import "@/font-awesome/index.js";
import router from "@/router/index.js";
import { createPinia } from "pinia";

const app = createApp(App);
const pinia = createPinia();

app.config.globalProperties.console = console;
app
  .use(router)
  .use(pinia)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
