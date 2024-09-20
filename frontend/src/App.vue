<script setup lang="ts">
// import { RouterLink, RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { ref } from 'vue';

const text = ref('');
</script>

<template>
  <div>
    <InputText v-model="text"/>
    {{ text }}
    <Button label="save"/>
  </div>
</template>

<style scoped>

</style>
