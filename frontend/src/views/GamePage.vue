<template>
    <div id="themes">
        <Tabs>
            <TabList>
                <Tab value="0">Randomized</Tab>
                <Tab value="1">Realistic</Tab>
                <Tab value="2">Anime</Tab>
                <Tab value="3">Photography</Tab>
                <Tab value="4">Still Life</Tab>
            </TabList>
        </Tabs>
    </div>
    <div id="options">

    </div>
    <div id="submit">
        <Button label="Submit" @click="visible = true"></Button>
        <p>COMBO: {{ combo }}</p>
    </div>
    <div id="result">
        <Dialog v-model:visible="visible">
            <p>your answer is correct / incorrect or whatever</p>
            <Button label="Try Again?" @click="visible = false"></Button>
        </Dialog>
    </div>
</template>

<script setup lang="ts">
//@ts-ignore
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import { ref } from 'vue'

const visible = ref(false)
const combo = ref(0)

</script>

<style scoped>

</style>