<template>
  <div>
    <!--Get icon for the change theme button or smth & move button to bottom right-->
    <Button
      type="button"
      class="button"
      label="Change Theme"
      @click="toggle"
      aria-haspopup="true"
      aria-controls="overlay_tmenu"
    />
    <Popover ref="themes" id="popover">
      <div id="popped-over">
        <label id="dark">
          Dark mode:
          <ToggleSwitch v-model="dark" @change="toggleDarkMode" />
        </label>
        <div id="color">
          Choose a color:
          <div id="colors">
            <div
              v-for="color in themeList"
              :key="color"
              class="circle"
              :style="`background-image: linear-gradient(30deg, var(--p-${color}-300), var(--p-${color}-700));`"
              v-tooltip.left="`${color}`"
              @click="changePrimaryColor(color)"
            ></div>
          </div>
        </div>
      </div>
    </Popover>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Button from 'primevue/button'
import Popover from 'primevue/popover'
import ToggleSwitch from 'primevue/toggleswitch'
import { updatePreset } from '@primevue/themes'
// use primevue's palettes
const themeList = [
  'red',
  'orange',
  'amber',
  'yellow',
  'lime',
  'green',
  'emerald',
  'teal',
  'cyan',
  'sky',
  'blue',
  'indigo',
  'violet',
  'purple',
  'fuchsia',
  'pink',
  'rose'
]
// not including 'slate', 'gray', 'zinc', 'neutral', 'stone' because they are all just gray and boring

//showing popover
const themes = ref()
const toggle = (event: Event) => {
  themes.value.toggle(event)
}

const dark = ref(false)

onMounted(() => {
  const element = document.querySelector('html')
  if (element && element.classList.contains('dark')) dark.value = true
})

function toggleDarkMode() {
  const element = document.querySelector('html')
  if (element) element.classList[dark.value ? 'add' : 'remove']('dark')
}

function changePrimaryColor(color: string) {
  updatePreset({
    semantic: {
      primary: {
        50: `{${color}.50}`,
        100: `{${color}.100}`,
        200: `{${color}.200}`,
        300: `{${color}.300}`,
        400: `{${color}.400}`,
        500: `{${color}.500}`,
        600: `{${color}.600}`,
        700: `{${color}.700}`,
        800: `{${color}.800}`,
        900: `{${color}.900}`,
        950: `{${color}.950}`
      }
    }
  })
}
</script>

<style scoped>
.button {
  position: fixed;
  bottom: 10px;
  right: 10px;
}

#popped-over {
  width: 20ch;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

#popped-over label#dark {
  display: flex;
  gap: 1ch;
}

#popped-over #color {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

#popped-over #colors {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1ch;
}

.circle {
  border: 1px solid var(--p-text-color);
  border-radius: 50%;
  width: 2ch;
  height: 2ch;
  cursor: pointer;
  transition: transform 10ms linear;
}

@media (hover: hover) {
  .circle:hover {
    transform: scale(1.2);
  }
}
</style>
