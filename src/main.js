import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";
import store from "./store";

import "./css/main.css";

import VueFeather from "vue-feather";
/* Fetch sample data */
store.dispatch("fetchClients");

/* Default title tag */
const defaultDocumentTitle = "Cloud Menu";

/* Collapse mobile aside menu on route change & set document title from route meta */
router.beforeEach(to => {
  store.dispatch("asideMobileToggle", false);
  store.dispatch("asideLgToggle", false);

  store.dispatch("formScreenToggle", !!to.meta.formScreen);
});

router.afterEach(to => {
  if (to.meta && to.meta.title) {
    document.title = `${to.meta.title} — ${defaultDocumentTitle}`;
  } else {
    document.title = defaultDocumentTitle;
  }
});

const app = createApp(App);
app.component(VueFeather.name, VueFeather)
app
  .use(store)
  .use(router)
  .mount("#app");
