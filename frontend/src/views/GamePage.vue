<template>
    <div id="themes">
        <Tabs>
            <TabList class="tabs" >
                <Tab v-for="tab in tabs" :value="tab.value">{{ tab.name }}</Tab>
            </TabList>
            <TabPanels>
                <TabPanel v-for="tab in tabs" :value="tab.value">
                    <p>{{ tab.name }}</p>
                </TabPanel>
            </TabPanels>
        </Tabs>
    </div>
    <div id="content">
        <div id="options">
            <Image :src="img" preview />
            <p>or</p>
            <Image :src="img" preview />
        </div>
        <Button label="Submit" @click="visible = true"></Button>
    </div>
    <div id="result">
        <Dialog v-model:visible="visible">
            <p>your answer is correct / incorrect or whatever</p>
            <Button label="Try Again?" @click="visible = false"></Button>
        </Dialog>
    </div>
    <Toolbar id="footer">
        <template #start>
            <Button>Home</Button>
        </template>
        <template #center>
            <p>COMBO: {{ combo }}</p>
        </template>
        <template #end>
            <Button>Help</Button>
        </template>
    </Toolbar>
</template>

<script setup lang="ts">
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';
import Image from 'primevue/image';
//import Sidebar from 'primevue/sidebar';
import Toolbar from 'primevue/toolbar';

import { ref } from 'vue'

const tabs = [{ name: "Randomized", value: "0" }, { name: "Realistic", value: "1" }, { name: "Anime", value: "2" }, { name: "Photogtaphy", value: "3" },  { name: "Still Life", value: "4" }, ]

const visible = ref(false)
const combo = ref(0)
const img = "https://th.bing.com/th/id/OIP.R7mawz2gXi7lPv7YigIZhAHaIl?w=186&h=216&c=7&r=0&o=5&pid=1.7"

</script>

<style scoped>
@import '../assets/themes.css';

body {
    background-color: var(pink);
}
#options {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
}
#content {
    width: 100%;
    justify-content: space-around;
}

#themes {
    align-items: center;
}

.tabs {
    align-self: center;
}

#footer {
    position: absolute;
    width: 95%;
    bottom: 0px;
}
</style>