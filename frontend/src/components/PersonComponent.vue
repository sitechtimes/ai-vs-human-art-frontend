<template>
  <div
    class="flex flex-row bg-primary-50 dark:bg-primary-950 p-7 m-7 rounded-md border border-primary-700 dark:border-primary-500 w-5/6"
  >
    <img class="object-contain w-52 h-80 flex self-center" :src="person.image" :alt="person.name" />
    <div class="flex flex-col justify-center p-5">
      <h3 class="text-3xl">{{ person.name }}</h3>
      <p class="text-sm">{{ person.blurb }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  person: Object
})
</script>

<style scoped></style>
