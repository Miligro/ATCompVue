import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import TheLoader from "./components/TheLoader.vue";

const app = createApp(App);

app.use(router);

import { library } from "@fortawesome/fontawesome-svg-core";

import {
  faMessage,
  faImages,
  faPenToSquare,
} from "@fortawesome/free-regular-svg-icons";
import { faWpforms } from "@fortawesome/free-brands-svg-icons";
import {
  faArrowUpLong,
  faArrowDownLong,
  faTrash,
  faCheck,
  faExclamation,
  faQuestion,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faMessage,
  faImages,
  faWpforms,
  faArrowUpLong,
  faArrowDownLong,
  faPenToSquare,
  faTrash,
  faCheck,
  faExclamation,
  faQuestion,
  faAngleLeft,
  faAngleRight
);

app.component("font-awesome-icon", FontAwesomeIcon);
app.component("TheLoader", TheLoader);

app.mount("#app");
