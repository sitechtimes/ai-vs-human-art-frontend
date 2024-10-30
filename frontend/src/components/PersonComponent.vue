<template>
  <div
    class="flex flex-row bg-primary-50 dark:bg-primary-950 p-7 m-7 rounded-md border border-primary-700 dark:border-primary-500"
  >
    <img
      class="object-contain w-52 h-80 flex self-center"
      src="/mizu_5.png"
      alt="mizukis fifth focus event."
    />
    <div class="flex flex-col justify-center p-5">
      <h3 class="text-3xl">{{ person.name }}</h3>
      <p class="text-sm">{{ person.blurb }}</p>
      <p class="text-sm" v-if="person.blurb === null">
        nani sono me yappa sono me/hajimemashite ja nai ne/nani sono me mou yamete/kawaii dake nano
        ni tsumi no aji/zureru zureru kuzureru/zureru ki ga fureru/himitsu hitotsu de
        kuzureru/kowareru, gomen/minai de rikai dekinai deshou?/marude saite shimatta bake no
        hana/nani mo ienai kakikesenai/donna ni minikuku utsuru keshou/minai de rikai dekinai
        deshou?/marude saite shimatta bake no hana/tsubomi ni wa mou modorenai
      </p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  person: Object
})
</script>

<style scoped></style>
