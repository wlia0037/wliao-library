import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'primeicons/primeicons.css'

import { createApp } from 'vue'
import App from './App.vue'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'  

import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

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

app.mount('#app')
