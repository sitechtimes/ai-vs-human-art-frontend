<script setup lang="ts">
import Button from 'primevue/button';
</script>

<template>
    <div class="buttons">
        <Button label="game" outlined  />
        <Button label="submit your art" outlined/>
        <Button label="acknowledgemnts" outlined/>
    </div>
</template>

<style scoped>
.buttons{
    padding: 2rem;
}

Button{
    background-color: aqua;
}

</style>