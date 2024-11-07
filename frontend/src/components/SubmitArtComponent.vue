<template>
  <div>
    <Fieldset legend="Submit your own art!">
      <h2>TOS</h2>
      <ScrollPanel class="min-h-64">
        <p>{{ idol }}</p>
      </ScrollPanel>
      <p>Check the box below to accept the TOS</p>
      <Checkbox v-model="checked" :binary="true" />
      <div>
        <FileUpload
          ref="fileupload"
          mode="basic"
          url="/api/upload"
          accept="image/*"
          :maxFileSize="1000000"
          @upload="uploadFile"
        />
        <Button v-if="checked" @click="uploadFile" aria-label="Upload Button">Upload</Button>
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
import { useImageStore } from '../stores/images'

const checked = ref(false)
const file = ref()
const imageStore = useImageStore()

const uploadFile = async () => {
  const type = ref('human')
  try {
    const res = await imageStore.uploadImage(type.value, file.value)
    if (res !== null) {
      console.log('yippee')
    }
  } catch (error) {
    console.error(error)
  }
}

//obviously the most important part of the code...
const idol =
  'Muteki no egao de arasu media Shiritai sono himitsu misuteriasu Nuketeru toko sae kanojo no eria Kanpeki de usotsuki na kimi wa Tensaitekina aidoru sama Kyou nani tabeta? Suki na hon wa? Asobi ni iku nara doko ni iku no? Nanimo tabetenai, sore wa naisho Nani wo kikaretemo norari kurari Sou tantan to, dakedo sansan to Miesou de mienai himitsu wa mitsu no aji Are mo nai, nai, nai Kore mo nai, nai, nai Suki na taipu wa? Aite wa? Saa kotaete'
</script>

<style scoped></style>
