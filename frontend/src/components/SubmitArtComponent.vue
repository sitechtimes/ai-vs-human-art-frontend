<template>
  <div>
    <form @submit.prevent="submit">
      <Fieldset legend="Submit your own art!">
        <div class="flex flex-col gap-2">
          <h2 class="text-xl">TOS</h2>
          <ScrollPanel>
            <p>{{ idol }}</p>
          </ScrollPanel>
          <div class="flex items-center gap-2">
            <label id="tos-label">I confirm that I have read and agree to these terms.</label>
            <Checkbox ariaLabelledby="tos-label" v-model="checked" :binary="true" />
          </div>
          <div class="flex flex-col gap-4 items-start">
            <div class="flex items-center gap-2">
              <label id="link-label">Link to art source:</label>
              <InputText aria-labelledby="link-label" v-model="link" />
            </div>
            <FileUpload
              mode="basic"
              :disabled="!checked"
              accept="image/*"
              :maxFileSize="1024 * 1024 * 15"
              customUpload
              @select="uploadedFile"
              aria-label="Upload an image"
            />
            <p>{{ message }}</p>
            <Button
              :disabled="!ok"
              type="submit"
              :class="`${checked ? 'cursor-pointer' : '!cursor-not-allowed'}`"
              >Submit</Button
            >
          </div>
        </div>
      </Fieldset>
    </form>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import Fieldset from 'primevue/fieldset'
import InputText from 'primevue/inputtext'
import FileUpload, { type FileUploadSelectEvent } from 'primevue/fileupload'
import Checkbox from 'primevue/checkbox'
import ScrollPanel from 'primevue/scrollpanel'
import Button from 'primevue/button'
import { useImageStore } from '../stores/images'

const imageStore = useImageStore()
const checked = ref(false)
const type = ref('human')
const link = ref('')
const message = ref('')
const file = ref<File>()
const uploading = ref(false)
const ok = computed(() => checked.value && file.value && !uploading.value)

async function uploadedFile(e: FileUploadSelectEvent) {
  file.value = e.files[0]
  message.value = 'File received'
}

async function submit() {
  try {
    uploading.value = true

    if (!file.value) {
      message.value = "You didn't attach a file"
      throw new Error('there is no file in ba sing se')
    }

    const formData = new FormData()
    formData.append('type', type.value)
    formData.append('link', link.value)
    formData.append('image', file.value)

    const res = await imageStore.uploadImage(formData)
    if (res?.ok) location.reload()
    else throw new Error((await res.json()).error)
  } catch (error) {
    console.error(error)
  }
  uploading.value = false
}

//obviously the most important part of the code...
const idol =
  'Muteki no egao de arasu media Shiritai sono himitsu misuteriasu Nuketeru toko sae kanojo no eria Kanpeki de usotsuki na kimi wa Tensaitekina aidoru sama Kyou nani tabeta? Suki na hon wa? Asobi ni iku nara doko ni iku no? Nanimo tabetenai, sore wa naisho Nani wo kikaretemo norari kurari Sou tantan to, dakedo sansan to Miesou de mienai himitsu wa mitsu no aji Are mo nai, nai, nai Kore mo nai, nai, nai Suki na taipu wa? Aite wa? Saa kotaete'
</script>

<style scoped></style>
