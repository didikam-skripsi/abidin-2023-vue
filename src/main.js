//import Bootstrap, Popper, jQuery
import "bootstrap/dist/css/bootstrap.css";
import "jquery/dist/jquery.min";
import "popper.js/dist/popper.min";
import "bootstrap/dist/js/bootstrap.min";
import "./assets/plugins/fontawesome-free/css/all.min.css";
import "./assets/dist/css/adminlte.min.css";
import "./assets/style.css";

import { createApp } from "vue";
import App from "./App.vue";

//import router
import router from "./router";
import { store } from './store';
import axios from "axios";

const app = createApp(App);
app.use(store);
axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL;
//use vue router
app.use(router);

app.mount("#app");
