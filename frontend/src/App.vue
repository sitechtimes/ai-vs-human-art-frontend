<script setup lang="ts">
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import ref from 'vue';

const text = ref('');
</script>

<template>
  <div>
    <InputText v-model="text"/>
    <Button label="Save"/>
    {{ text }}

  </div>
</template>

<style scoped>

</style>
