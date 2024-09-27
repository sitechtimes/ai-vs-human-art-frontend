<template>
  <div>
    <!--Get icon for the change theme button or smth & move button to bottom right-->
    <Button type="button" label="Change Theme" @click="toggle" aria-haspopup="true" aria-controls="overlay_tmenu" />
    <Popover ref="themes">
        <span>Current: {{ selectedTheme }} Theme</span>
        <ul>
            <div v-for="theme in allThemes" :key="theme.label" @click="changeTheme(theme)">
                <p>{{ theme.label }}</p>
            </div>
        </ul>
    </Popover>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Button from 'primevue/button'
import Popover from 'primevue/popover';
const selectedTheme = ref('Default')

//showuing popover
const themes = ref()
const toggle = (event:Event) => {
    themes.value.toggle(event);
};

function changeTheme(theme:Theme) {
    const currentStylesheet= document.getElementById('stylesheet') as HTMLLinkElement;
    selectedTheme.value = theme.label 
    if (currentStylesheet) {
        currentStylesheet.href = `./public/themes/${theme.link}/theme.css`
    } else {
        return ':( element not found'
    }
}

interface Theme {
    label: string,
    link: string,
};
const allThemes = ref<Theme[]>([
  { label: 'Default', link: 'default-green'},
  { label: 'Dark', link: 'dark-blue'},
  { label: 'Light', link: 'light-pink'},
]);


</script>

<style scoped>

</style>