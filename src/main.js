import Vue from "vue";
import App from "./App.vue";
import "@fortawesome/fontawesome-free/css/all.css";
import "@/assets/css/app.css";
import store from "@/store/currencyStore";

Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
