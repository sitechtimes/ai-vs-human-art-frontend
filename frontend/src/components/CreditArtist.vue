<template>
    <div>
        <p>The real MVPS who gave their support despite me having nothing ♡</p>
        <div class="grid grid-cols-1 md:grid-cols-4">
            <div
                v-for="creator in creators"
                :key="creator.name"
                :person="creator"
                class="m-2 bg-primary-100 dark:!bg-primary-900 flex flex-col rounded p-4 self-center self-stretch"
            >
            <h4>{{ creator.name }}</h4>
            <!-- <img
                class="object-contain w-52 h-60 flex place-self-center"
                :src="creator.image"
                :alt="creator.name"
            /> -->
            <div>
                <p>{{ creator.socials }}</p>
            </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const creators = [
  { name: 'Zakuga Mignon', socials: "@ZakugaMignon on Twitter/X & Bluesky", image: null },
  { name: 'Benjamin BLM', socials: '@stealcase on Twitter/X', image: null  },
  { name: 'garutanachi', socials: "@garutanachi on Twitter/X and Instagram", image: null },
  { name: 'uikaposting', socials: '@uikaposting on Twitter/X', image: null },
  { name: '冬月', socials: "@Fuyutsuki11 on Twitter/X and Instagram", image: null },
  { name: 'xiisalt', socials: "@xiisalt_ on Twitter/X", image: null },
  { name: 'Sev', socials: "@volt7ge on Twitter/X and Instagram", image: null },
  { name: 'Rex', socials: "@_rexpo on Twitter/X", image: null },
  { name: 'el', socials: "@elodeas on Twitter/X", image: null },
  { name: "Let's Lament", socials: "@lets_lam3nt on Twitter/X", image: null },
  { name: 'Nami Athena', socials: "@Nami_Athena on Twitter/X", image: null },
  { name: 'el', socials: "@elodeas on Twitter/X", image: null },
  { name: 'dysfunct1iona1', socials: "@Dysfunct1ona1 on Twitter/X", image: null },
  { name: 'celtreny', socials: "@celtreny on Twitter/X", image: null },
  { name: 'mimiruku', socials:"mimiruku on Discord", image: null}, 
]
</script>




<style scoped>

</style>