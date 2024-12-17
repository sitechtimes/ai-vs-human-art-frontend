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
            <div v-for="picture in pictures" :key="picture">
              <div class="flex items-center gap-2">
                <label id="link-label">Link to art source:</label>
                <InputText aria-labelledby="link-label" v-model="link" :disabled="!checked" />
              </div>
              <FileUpload
                mode="basic"
                :disabled="!checked"
                accept="image/*"
                :maxFileSize="1024 * 1024 * 15"
                customUpload
                @select="uploadedFile"
                :multiple="true"
                label="Upload an image"
              />
            </div>
            <Button v-if="isAdmin" label="Upload More" @click="addUpload()" />
            <!-- <p>{{ message }}</p> -->
            <Toast />
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
import { useUserStore } from '../stores/user'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'

const imageStore = useImageStore()
const checked = ref(false)
const type = ref('unscreened')
const link = ref([])
const message = ref('')
const file = ref<File>([])
const uploading = ref(false)
const ok = computed(() => checked.value && file.value && !uploading.value)
const pictures = ref(1)
const toast = useToast()

const userStore = useUserStore()
const user = userStore.currentUser
const isAdmin = userStore.isAdmin
console.log('user', userStore.isAdmin)
console.log(isAdmin)

async function uploadedFile(e: FileUploadSelectEvent) {
  const NewFiles = e.files
  file.value.push(...newFiles)
  showFile()
  const updatedLinks = [...link.value]
  updatedLinks.push('')
  link.value = updatedLinks
  console.log(file.value)
  console.log(link.value)
}

const showFile = () => {
  toast.add({
    severity: 'success',
    summary: 'Success',
    detail: 'File successfully uploaded.',
    life: 3000
  })
}

const showSuccess = () => {
  toast.add({
    severity: 'success',
    summary: 'Success',
    detail: 'Art successfully submitted.',
    life: 3000
  })
}

async function submit() {
  try {
    uploading.value = true
    if (!user) {
      message.value = `You must be logged in to submit art`
      throw new Error('not logged in')
    }

    if (!file.value) {
      message.value = "You didn't attach a file"
      throw new Error('there is no file in ba sing se')
    }

    const formData = new FormData()
    formData.append('type', type.value)
    formData.append('link', link.value.split(','))
    formData.append('image', file.value)

    const res = await imageStore.uploadImage(formData)
    // if (res?.ok) location.reload()
    if (res?.ok) showSuccess()
    else throw new Error((await res.json()).error)
  } catch (error) {
    console.error(error)
  }
  uploading.value = false
}
//obviously the most important part of the code...
const idol =
  'Muteki no egao de arasu media Shiritai sono himitsu misuteriasu Nuketeru toko sae kanojo no eria Kanpeki de usotsuki na kimi wa Tensaitekina aidoru sama Kyou nani tabeta? Suki na hon wa? Asobi ni iku nara doko ni iku no? Nanimo tabetenai, sore wa naisho Nani wo kikaretemo norari kurari Sou tantan to, dakedo sansan to Miesou de mienai himitsu wa mitsu no aji Are mo nai, nai, nai Kore mo nai, nai, nai Suki na taipu wa? Aite wa? Saa kotaete'

const addUpload = () => {
  pictures.value++
}
</script>

<style scoped></style>
