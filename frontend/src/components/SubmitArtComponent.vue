<template>
  <div>
    <Fieldset legend="Submit your own art!">
      <h2>TOS</h2>
      <ScrollPanel class="min-h-80">
        <p></p>
      </ScrollPanel>
      <p>Check the box below to accept the TOS</p>
      <Checkbox v-model="checked" :binary="true" />
      <div v-if="checked">
        <FileUpload
          ref="fileupload"
          mode="basic"
          name="demo[]"
          url="/api/upload"
          accept="image/*"
          :maxFileSize="1000000"
          @upload="onUpload"
        />
        <Button @click="uploadFile" aria-label="Upload Button">Upload</Button>
      </div>
    </Fieldset>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Fieldset from 'primevue/fieldset'
import FileUpload from 'primevue/fileupload'
import Checkbox from 'primevue/checkbox'
import ScrollPanel from 'primevue/scrollpanel'
import Button from 'primevue/button'

const checked = ref(false)
const file = ref()

const uploadFile = () => {
  file.value.upload()
  console.log(file.value)
}

const onUpload = () => {
  console.log('uploaded')
}
</script>

<style scoped></style>
