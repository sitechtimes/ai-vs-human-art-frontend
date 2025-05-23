import { createApp } from 'vue'
import { createPinia } from 'pinia'

import Aura from '@primevue/themes/aura'
import Ripple from 'primevue/ripple'

import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'

import './assets/index.css'

const app = createApp(App)

app.directive('ripple', Ripple)
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
app.use(ToastService)

app.mount('#app')
