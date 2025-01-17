<!-- //skibidi gyat ohio rizz rizz mr beast lunchly ksi "thick of it"
//:3
// - tina -->

<template>
  <div>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <div class="bg-[url('/concept1animation.gif')] h-svh bg-cover bg-no-repeat static">
      <div class="absolute top-24 right-0 xl:right-32">
        <img src="/logo_black_white.gif" class="mt-16 sm:mt-0" />
        <div class="relative sm:left-32 flex flex-col w-11/12 mx-auto sm:w-80 sm:mx-0 gap-10">
          <Button as="router-link" placeholder="Overriden" class="btn" label="gaym" to="/game" />

          <Button
            as="router-link"
            placeholder="Overriden"
            class="btn"
            label="submit your art"
            to="/submit"
          />

          <Button
            as="router-link"
            placeholder="Overriden"
            class="btn"
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

.btn {
  @apply !border-[3px] border-primary-200 dark:border-primary-700 transition duration-300 ease-in-out -rotate-6 hover:scale-125 press-start-2p-regular h-12 text-center rounded-none hover:dark:!bg-red-500 hover:!bg-green-500;
}
</style>
