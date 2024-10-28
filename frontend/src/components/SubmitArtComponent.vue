<template>
  <div>
    <Fieldset legend="Submit your own art!">
      <InputText></InputText>
      <FileUpload mode="basic"></FileUpload>
    </Fieldset>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Fieldset from 'primevue/fieldset'
import InputText from 'primevue/inputtext'
import FileUpload from 'primevue/fileupload'
</script>

<style scoped></style>
