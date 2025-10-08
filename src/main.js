// Import global styles and UI libraries
import "./assets/main.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "primeicons/primeicons.css";

import { createApp } from "vue";
import App from "./App.vue";

import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";
import DataTable from "primevue/datatable";
import Column from "primevue/column";

import router from "./router";
import db from "./Firebase/init"; // ensure Firebase/Firestore is initialized

const app = createApp(App);

app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: "system",
      cssLayer: false,
    },
  },
});

app.component("DataTable", DataTable);
app.component("Column", Column);

app.use(router);
app.mount("#app");
