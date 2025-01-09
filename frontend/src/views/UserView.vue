<template>
  <div>
    <!-- must add v-if for missing user -->
    <div
      class="flex flex-row bg-primary-50 dark:bg-primary-950 p-7 m-7 rounded-md border border-primary-700 dark:border-primary-500"
    >
      <img
        :src="userData['profile_picture']"
        alt="placeholder avatar"
        class="clip-circle w-1/2 h-1/2"
      />
      <div class="flex flex-col justify-center p-5">
        <h3 class="text-3xl">{{ userData['username'] }}</h3>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, inject } from 'vue'
import Avatar from 'primevue/avatar'
import { useRoute } from 'vue-router'
const userData = inject('userData')
</script>

<style scoped></style>
