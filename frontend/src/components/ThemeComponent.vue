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
    <Popover ref="themes" id="popover" @show="open = true" @hide="open = false">
      <div id="popped-over">
        <label id="dark">
          Dark mode:
          <ToggleSwitch v-model="dark" @change="toggleDarkMode" />
        </label>
        <div id="color">
          Choose a color:
          <div id="colors" @mouseleave="hover = selected">
            <div
              id="color-text"
              :style="{
                backgroundColor: `var(--p-${hover}-${dark ? 400 : 500})`,
                color: dark ? 'white' : 'black'
              }"
            >
              <output>{{ hover }}</output>
            </div>

            <button
              v-for="(color, index) in themeList"
              :key="color"
              class="circle"
              :style="{
                backgroundImage: `linear-gradient(${(index / themeList.length) * -2 * Math.PI}rad, var(--p-${color}-200), var(--p-${color}-600))`,
                transform: `translate(calc(-50% - ${Math.sin((index / themeList.length) * 2 * Math.PI) * 290 * Number(open)}%), calc(-50% - ${Math.cos((index / themeList.length) * 2 * Math.PI) * 290 * Number(open)}%))`,
                zIndex: `${themeList.length - index + 5}`,
                borderWidth: color === selected ? `3px` : '',
                boxShadow:
                  color === selected ? `0 0 8px var(--p-primary-${dark ? '600' : '200'}` : '',
                borderColor: `var(--p-primary-'${dark ? '100' : '600'}`
              }"
              @click="changeColors(color)"
              @mouseenter="hover = color"
              :aria-label="color"
            ></button>
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
import { updatePrimaryPalette, updateSurfacePalette } from '@primevue/themes'
// use primevue's palettes
const themeList = [
  'red',
  'orange',
  'amber',
  //'yellow',
  //'lime',
  'green',
  'emerald',
  'teal',
  'sky',
  'blue',
  'indigo',
  'violet',
  'purple',
  //  'fuchsia',
  'pink'
  //  'rose'
]
// not including 'slate', 'gray', 'zinc', 'neutral', 'stone' because they are all just gray and boring
const hover = ref('')
const selected = ref('')

// showing popover
const themes = ref()
const open = ref(false)
const toggle = (event) => {
  themes.value.toggle(event)
  hover.value = selected.value ?? 'emerald'
}

const dark = ref(false)

onMounted(async () => {
  if (localStorage.getItem('dark') === 'true') dark.value = true
  toggleDarkMode()
  await null
  /*
  theme WILL NOT APPLY on page load without the await above!!
  however, this is the least serious await ever.
  you don't have to put a promise in there:
  - i've put a console.log() there
  - i've put (1 - 1) there
  - i've put null there
  anything will work. except nothing. nothing won't work
   */
  selected.value = localStorage.getItem('theme') ?? 'emerald'
  changeColors(selected.value)
})

const toggleDarkMode = () => {
  const element = document.querySelector('html')
  if (element) element.classList[dark.value ? 'add' : 'remove']('dark')
  localStorage.setItem('dark', String(dark.value))
}

const changeColors = (color) => {
  const palettes = {
    0: `{${color}.200}`,
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

  //fixes all the contrast errors dealing with wave
  palettes[500] = palettes[800] //tabmenu text
  palettes[700] = palettes[800] //menubar text

  if (dark.value) {
    palettes[400] = palettes[200]
    palettes[600] = palettes[200]
    palettes[50] = palettes[600]
  }
  updatePrimaryPalette(palettes)
  updateSurfacePalette(palettes)

  selected.value = color
  localStorage.setItem('theme', color)
}
</script>

<style scoped>
.button {
  position: fixed;
  bottom: 10px;
  right: 10px;
}

#popped-over {
  min-width: 20rem;
  width: min-content;
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
  width: 100%;
  aspect-ratio: 1/1;
  border-radius: 50%;
  contain: layout;
}

#color-text {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  border-radius: 50%;
  aspect-ratio: 1/1;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: background-color 200ms linear;
}

#color-text span {
  font-size: 1em;
  position: absolute;
  top: 25%;
}
#color-text output {
  font-size: 2em;
}

.circle {
  position: absolute;
  left: 50%;
  top: 50%;
  border: 1px solid var(--p-text-color);
  border-radius: 50%;
  width: 14%;
  aspect-ratio: 1/1;
  cursor: pointer;
  /* transition: transform 1s cubic-bezier(0.375, 0.885, 0.5, 1.275); tina is a hater 😒😒😒😒 */
  /* also leaving this here */
  /* transition-delay: ${100 + index ** 1.2 * 10}ms; */
}

@media (hover: hover) {
  .circle:hover {
    border-width: 2px;
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 200ms linear;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
