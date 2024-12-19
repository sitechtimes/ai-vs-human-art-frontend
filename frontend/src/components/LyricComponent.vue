<template>
  <div
    class="w-fit flex flex-row items-center gap-2 rounded-xl p-2 bg-slate-200 dark:bg-zinc-800 border-2"
    :style="{
      borderColor: color,
      backgroundColor: `color-mix(in srgb, ${color}, transparent 80%)`
    }"
  >
    <div class="opacity-100">
      <img class="size-40 rounded-xl" :src="image" :alt="name" />
      <div class="flex flex-col justify-center p-2">
        <div class="w-min">
          <h2 class="xl:text-3xl text-2xl">
            {{ name }}
          </h2>
        </div>
        <p class="xl:text-base text-sm" v-html="yap"></p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  name: string
  image: string
  yap: string
  color: string
}>()
</script>

<style scoped></style>
