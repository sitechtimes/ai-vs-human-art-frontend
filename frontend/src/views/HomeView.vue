<!-- //skibidi gyat ohio rizz rizz mr beast lunchly ksi "thick of it"
//:3
// - tina -->

<template>
  <div>
    <div class="bg-[url('/concept1animation.gif')] h-dvh bg-cover bg-no-repeat static">
      <div class="absolute top-24 right-0 xl:right-32 mr-4">
        <img src="/logo_black_white.gif" class="mt-16 sm:mt-0" />
        <div class="relative sm:left-32 flex flex-col w-11/12 mx-auto sm:w-80 sm:mx-0 gap-10">
          <Button as="RouterLink" placeholder="Overriden" class="btn" label="Gaym" to="/game" />

          <Button
            as="RouterLink"
            placeholder="Overriden"
            class="btn"
            label="Submit your Art"
            to="/submit"
          />

          <Button
            as="RouterLink"
            placeholder="Overriden"
            class="btn"
            label="Acknowledgments"
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
.btn {
  @apply !border-[3px] border-primary-200 dark:border-primary-700 transition duration-300 ease-in-out -rotate-6 hover:scale-110 h-12 text-center rounded-none hover:dark:!bg-primary-700 hover:!bg-primary-500;
}
@media (max-width: 640px) {
  .btn {
    @apply scale-95 hover:scale-105;
  }
}
</style>
