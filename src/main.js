// Import global styles and UI libraries
import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'primeicons/primeicons.css'

import { createApp } from 'vue'
import App from './App.vue'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

import router from './router'

import { initializeApp } from "firebase/app"

const firebaseConfig = {
  apiKey: "AIzaSyBw6xGu0JMz0xeomy_egr7YlBvAyPV1sSk",
  authDomain: "week7-wenshi.firebaseapp.com",
  projectId: "week7-wenshi",
  storageBucket: "week7-wenshi.firebasestorage.app",
  messagingSenderId: "477602880461",
  appId: "1:477602880461:web:76f5f9682540e3e5658284"
}

// Initialize Firebase
initializeApp(firebaseConfig)

// Vue App Setup
const app = createApp(App)

app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: 'system',
      cssLayer: false
    }
  }
})

app.component('DataTable', DataTable)
app.component('Column', Column)

app.use(router)
app.mount('#app')
