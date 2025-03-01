//import '../themes/default-green/theme.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/index.css'

import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura' // me too I am aura yes. love all my fans iTs time

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: '.dark'
    }
  }
})

app.mount('#app')
