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
        <div class="grid grid-cols-6 space-y-8 ms-96">
            <Button class="col-start-3 col-span-3" label="j"/>
            <Button class="col-start-3 col-span-3" label="j"/>
            <Button class="col-start-3 col-span-3" label="j"/>
        </div>
    </div>
</template>

<style scoped>

</style>