import { createApp } from "vue";
import App from "./App.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faPlus,
  faSquarePlus,
  faStar,
  faX,
  faPen,
  faCalendarDays,
  faFile,
  faCommentDots,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import "./assets/style.css";

library.add(
  faStar,
  faPlus,
  faSquarePlus,
  faX,
  faPen,
  faCalendarDays,
  faFile,
  faCommentDots
);

createApp(App).component("font-awesome-icon", FontAwesomeIcon).mount("#app");
