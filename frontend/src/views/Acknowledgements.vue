<template>
  <div class="mx-4 md:mx-8">
    <h1 class="mt-20 mb-4 text-2xl font-bold">Acknowledgements</h1>
    <div class="card" >
      <Accordion value="0">
        <AccordionPanel value="0">
          <AccordionHeader>Thank you ♡</AccordionHeader>
          <AccordionContent>
            <p class="m-0">
              <CreditEssay/>
            </p>
          </AccordionContent>
        </AccordionPanel>
        <AccordionPanel value="1">
          <AccordionHeader>Starred Creators/Artists ★</AccordionHeader>
          <AccordionContent>
            <p class="m-0">
              <CreditArtist/>
            </p>
          </AccordionContent>
        </AccordionPanel>
      </Accordion>
    </div>
  </div>
</template>

<script setup>
import CreditEssay from '@/components/CreditEssay.vue'
import CreditArtist from '@/components/CreditArtist.vue'

import Accordion from 'primevue/accordion'
import AccordionPanel from 'primevue/accordionpanel'
import AccordionHeader from 'primevue/accordionheader'
import AccordionContent from 'primevue/accordioncontent'


</script>

<style scoped></style>
