import "@/css/main.scss";

import "@/monkey.js";
import { createApp } from "vue";
import { routes } from "./routes.js";
import { createRouter, createWebHistory } from "vue-router";
import { createPinia } from "pinia";

import App from "./App.vue";

const app = createApp(App);

const router = createRouter({
  history: createWebHistory(),
  routes,
});

app.use(createPinia());
app.use(router);
app.mount("#app");
