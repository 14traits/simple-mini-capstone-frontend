import axios from "axios";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

axios.defaults.baseURL = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "/";

createApp(App).use(router).mount("#app");
