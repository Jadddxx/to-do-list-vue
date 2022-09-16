import { createApp } from "vue";
import App from "./App.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import "./assets/style.css";

library.add(faPlus);

createApp(App).component("font-awesome-icon", FontAwesomeIcon).mount("#app");
