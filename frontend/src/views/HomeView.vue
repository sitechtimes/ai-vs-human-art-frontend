<!-- //skibidi gyat ohio rizz rizz mr beast lunchly ksi "thick of it"
//:3
// - tina -->

<template>
  <div>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <div class="bg-[url('/concept1animation.gif')] h-svh bg-cover bg-no-repeat static">
      <div class="absolute top-24 right-0 xl:right-32">
        <img src="/logo_black_white.gif" class="mt-16 sm:mt-0" />
      </div>
      <div class="pt-6">
        <div class="grid lg:grid-cols-12 grid-cols-6 space-y-9">
          <Button
            as="router-link"
            placeholder="Overriden"
            class="!border-[2px] !border-primary-200 dark:!border-primary-700 !transition duration-300 ease-in-out delay-300 -rotate-6 dark:(hover:bg-primary-200) hover:!bg-primary-950 hover:scale-125 press-start-2p-regular lg:col-start-8 col-start-2 col-span-4 h-12 text-center !rounded-none mt-96"
            label="gaym"
            to="/game"
          />

          <Button
            as="router-link"
            placeholder="Overriden"
            class="!border-[3px] !border-primary-200 dark:!border-primary-700 !transition duration-300 ease-in-out delay-300 -rotate-6 hover:(dark:bg-primary-200) hover:!bg-primary-950 hover:scale-125 press-start-2p-regular lg:col-start-8 col-start-2 col-span-4 h-12 text-center !rounded-none mt-96"
            label="submit your art"
            to="/submit"
          />

          <Button
            as="router-link"
            placeholder="Overriden"
            class="!border-[3px] !border-primary-200 dark:!border-primary-700 !transition duration-300 ease-in-out delay-300 -rotate-6 hover:!bg-primary-950 hover:scale-125 dark:(hover:!bg-primary-600) press-start-2p-regular lg:col-start-8 col-start-2 col-span-4 h-12 text-center !rounded-none mt-96"
            label="acknowledgments"
            to="/credits"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Button from 'primevue/button'
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
.press-start-2p-regular {
  font-family: 'Press Start 2P', system-ui;
  font-weight: 400;
  font-style: normal;
}
</style>
