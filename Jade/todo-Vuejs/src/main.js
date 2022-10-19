import { createApp } from "vue";
import App from "./App.vue";
import "./assets/style.css";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import "@/font-awesome/index.js";
import router from "@/router/index.js";
import draggable from "vuedraggable";

const app = createApp(App);

app.config.globalProperties.console = console;
app
  .use(router)
  .component("draggable", draggable)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
export default { component: { draggable } };
