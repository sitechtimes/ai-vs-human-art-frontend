<template>
  <div class="mt-[58px]">
    <div class="grid grid-cols-1 lg:grid-cols-2 justify-items-center">
      <div
        v-for="person in persons"
        :key="person.name"
        :person="person"
        class="flex flex-row bg-primary-50 dark:bg-primary-950 p-7 m-7 rounded-md border border-primary-700 dark:border-primary-500 w-5/6"
      >
        <img
          class="object-contain w-52 h-80 flex self-center"
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
  { name: 'Katherine Z', blurb: null, image: null },
  { name: 'Tina G', blurb: null, image: null },
  { name: 'Richard M', blurb: null, image: null },
  { name: 'Yifan Z', blurb: null, image: null }
]
</script>

<style scoped></style>
