import { createApp } from "vue";
import App from "./App.vue";

import { Quasar, Dark } from "quasar";
import quasarLang from "quasar/lang/en-US";
import quasarIconSet from "quasar/icon-set/material-icons";

import "quasar/src/css/index.sass";

const app = createApp(App);

app.use(Quasar, {
  plugins: {}, // Add Dialog, Notify later
  lang: quasarLang,
  iconSet: quasarIconSet,
});

app.mount("#app");
