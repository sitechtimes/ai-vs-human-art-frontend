<template>
  <div class="mt-16">
    <h1 class="font-bold text-xl md:text-2xl text-center underline">THE TEAM</h1>
    <p class="text-center text-sm">Behold, the rag-tag team of teenagers. </p>
    <div class="grid grid-rows-4 lg:grid-cols-4 justifdy-items-center">
      <div 
        v-for="person in persons"
        :key="person.name"
        :person="person"
        class="flex flex-col bg-primary-50 dark:bg-primary-950 p-7 m-7 rounded-md border border-primary-700 dark:border-primary-500 w-5/6"
      >
        <img
          class="object-contain w-52 h-60 flex place-self-center"
          :src="person.image"
          :alt="person.name"
        />
      
        <div class="flex flex-col justify-center p-5">
          <h3 class="text-3xl">{{ person.name }}</h3>
          <p class="text-sm">{{ person.blurb }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const persons = [
  { name: 'Katherine Z', blurb: "Hi! Currently a high school senior, and somehow always tired. Outside of art, I try to dabble in music, game dev, writing, and their relation to math, logic, and science: how the world turns. Talk to me about Limbus Company, Arknights, Bocchi the Rock, Genshin Sumeru, Vocaloid, and Umamusume!", image: '../../ppfpfp.png' },
  { name: 'Tina G', blurb: 'Staten Island Technical High School graduate and self  taught artist!! I love making keychains and other types of merch for my favorite characters <3. AND the coolest person you will ever meet.', image: '../../tinaabout.png'  },
  { name: 'Richard M', blurb: "to be added LOL", image: null },
  { name: 'Yifan Z', blurb: 'Graduated from Staten Island Technical High School in 2025. A big fan of fish and virtual fishing. You can probably find me reading manga.', image: '../../worm.png' }
]
</script>

<style scoped></style>
