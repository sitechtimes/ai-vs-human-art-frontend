<script setup lang="ts">
import Button from 'primevue/button'
import HeaderComponent from '@/components/HeaderComponent.vue'

//skibidi gyat ohio rizz rizz mr beast lunchly ksi "thick of it"
//:3
// - tina
</script>

<template>
  <div>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <div class="bg-[url('/concept1animation.gif')] h-svh bg-cover bg-no-repeat static">
      <div class="absolute top-24 right-0 xl:right-32">
        <img src="/logo_black_white.gif" class="mt-16 sm:mt-0" />
      </div>

      <!-- <HeaderComponent class="opacity-0 hover:opacity-100"/> -->
      <div class="grid lg:grid-cols-12 grid-cols-6 space-y-9">
        <Button
          as="router-link"
          placeholder="Overriden"
          class="!bg-primary-400 !border-[3px] !border-primary-900 !textdark:!bg-primary-900 dark: !transition duration-300 ease-in-out delay-300 -rotate-6 hover:!bg-primary-400 hover:scale-125 press-start-2p-regular hover:!outline-none lg:col-start-8 lg:col-span-4 col-start-2 col-span-4 h-12 text-center !rounded-none mt-96"
          label="gaym"
          to="/game"
        />
        <!-- its small AND above -->
        <Button
          as="router-link"
          placeholder="Overriden"
          class="!transition duration-300 ease-in-out delay-300 -rotate-6 hover:!bg-black hover:scale-125 press-start-2p-regular lg:col-start-8 lg:col-span-4 col-start-2 col-span-4 h-12 text-center !rounded-none"
          label="submit your art"
          to="/submit"
        />

        <Button
          as="router-link"
          placeholder="Overriden"
          class="!transition duration-300 ease-in-out delay-300 -rotate-6 hover:!bg-black hover:scale-125 press-start-2p-regular lg:col-start-8 lg:col-span-4 col-start-2 col-span-4 h-12 text-center !rounded-none"
          label="acknowledgments"
          to="/credits"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
.press-start-2p-regular {
  font-family: 'Press Start 2P', system-ui;
  font-weight: 400;
  font-style: normal;
}
</style>
