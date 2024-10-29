<template>
  <div>
    <Fieldset legend="Submit your own art!">
      <h2>TOS</h2>
      <ScrollPanel class="min-h-80">
        <p></p>
      </ScrollPanel>
      <p>Check the box below to accept the TOS</p>
      <Checkbox v-model="checked" :binary="true" />
      <FileUpload v-if="checked" mode="basic" v-model="file"></FileUpload>
    </Fieldset>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Fieldset from 'primevue/fieldset'
import FileUpload from 'primevue/fileupload'
import Checkbox from 'primevue/checkbox'
import ScrollPanel from 'primevue/scrollpanel'

const checked = ref(false)
const file = ref('')
</script>

<style scoped></style>
