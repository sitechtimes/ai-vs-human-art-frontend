<template>
  <div
    class="flex flex-row bg-primary-50 dark:bg-primary-950 p-7 m-7 rounded-md border border-primary-700 dark:border-primary-500"
  >
    <p>{{ userData }}</p>
    <!--     <img
      class="object-contain w-52 h-80 flex self-center"
      :src="userData['profile_picture']"
      :alt="userData['username']"
    />
    <div class="flex flex-col justify-center p-5">
      <h3 class="text-3xl">{{ userData['username'] }}</h3>
    </div> -->
  </div>
</template>

<script setup>
defineProps({
  userData: Object
})
</script>

<style scoped></style>
