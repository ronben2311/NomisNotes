import { createApp } from "vue";
import App from "./App.vue";

import { createPinia } from "pinia";
import { Quasar } from "quasar";
import quasarLang from "quasar/lang/en-US";
import quasarIconSet from "quasar/icon-set/material-icons";

import "quasar/src/css/index.sass";

const app = createApp(App);

const pinia = createPinia();
app.use(pinia);

app.use(Quasar, {
  plugins: {},
  lang: quasarLang,
  iconSet: quasarIconSet,
});

app.mount("#app");
