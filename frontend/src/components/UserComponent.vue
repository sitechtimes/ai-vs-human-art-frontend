<template>
  <div>
    <p>{{ data }}</p>
    <img v-bind:src="data" />
  </div>
</template>

<script setup>
defineProps({
  data: Object
})
</script>

<style scoped></style>
