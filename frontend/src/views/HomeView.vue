<script setup lang="ts">
import Button from 'primevue/button';
import HeaderComponent from '@/components/HeaderComponent.vue';
// import { reactive } from 'vue'

// const styleObject = reactive({
//   color: 'red',
//   fontSize: '30px'
// })
</script>

<template>
    <!-- <div :style="styleObject">  -->
    <div class="bg-[url('/concept1.png')] h-svh"> <!-- h = height -->
        <!-- <HeaderComponent/> -->
        <div class="grid grid-cols-6 space-y-8 ms-96 -rotate-6"> fix heights/widths for buttons
            <Button as="router-link" class="col-start-3 col-span-3 h-16" label="gaym" to="/game" />
            <Button as="router-link" class="col-start-3 col-span-3" label="submit your art" to="/submit"/> make submit into own thing
            <Button as="router-link" class="col-start-3 col-span-3" label="acknowledgments (to the world)" to="/credits"/>
        </div>
    </div>
</template>

<style scoped>

</style>