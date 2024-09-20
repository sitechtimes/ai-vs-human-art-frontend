import "./assets/main.css"

import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import app from './App.vue'

const app = createApp(app);
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});

app.mount("#app")

