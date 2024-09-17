import PrimeVue from 'primevue/config'
import { definePreset } from '@primevue/themes'
import Aura from '@primevue/themes/aura'

const PinkPreset = definePreset(Aura, {
  semantic: {
    colorScheme: {
      light: {
        surface: {
          white: '#FFFCFE',
          pink: '#FFABDB',
          lightpurple: '#545AFE',
          darkpurple: '#231892'
        }
      }
    }
  }
})

// https://primevue.org/passthrough/
