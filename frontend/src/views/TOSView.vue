<template>
    <div class="mx-4 md:mx-8">
    <h1 class="mt-20 text-2xl font-bold">TOS and Consent Forms</h1>
    <p class="my-4">We ask you to please review and agree to our TOS and Consent Form before proceeding further. Thank you! </p>
    <div class="card">
        <Accordion value="0">
            <AccordionPanel value="0">
                <AccordionHeader>Consent Form</AccordionHeader>
                <AccordionContent>
                    <p class="m-0">
                        <ConsentForm/>
                    </p>
                </AccordionContent>
            </AccordionPanel>
            <AccordionPanel value="1">
                <AccordionHeader>Terms of Service</AccordionHeader>
                <AccordionContent>
                    <TermsService/>
                </AccordionContent>
            </AccordionPanel>
        </Accordion>
    </div>
    </div>
</template>

<script setup>
import TermsService from '@/components/TermsService.vue';
import ConsentForm from '@/components/ConsentForm.vue';

import Accordion from 'primevue/accordion';
import AccordionPanel from 'primevue/accordionpanel';
import AccordionHeader from 'primevue/accordionheader';
import AccordionContent from 'primevue/accordioncontent';


</script>

<style scoped>

</style>