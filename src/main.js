import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import AlertDialog from "./components/AlertDialog.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const app = createApp(App);

app.use(router);

app.component("font-awesome-icon", FontAwesomeIcon);
app.component("AlertDialog", AlertDialog);

app.mount("#app");
