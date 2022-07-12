import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import AlertDialog from "./components/AlertDialog.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const app = createApp(App);

app.use(router);

import { library } from "@fortawesome/fontawesome-svg-core";

import { faMessage, faImages } from "@fortawesome/free-regular-svg-icons";
import { faWpforms } from "@fortawesome/free-brands-svg-icons";

library.add(faMessage, faImages, faWpforms);

app.component("font-awesome-icon", FontAwesomeIcon);
app.component("AlertDialog", AlertDialog);

app.mount("#app");
