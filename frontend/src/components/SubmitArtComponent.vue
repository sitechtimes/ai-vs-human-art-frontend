<template>
  <div>
    <form @submit.prevent="submit">
      <Fieldset legend="Submit your own art!" class="flex place-self-center items-center w-4/5">
        <div class="flex flex-col gap-2">
          <h2 class="text-xl">TERMS OF SERVICE & FAQ</h2>
          <ScrollPanel style="h-2/3">
            <p>{{ tos }}</p>
          </ScrollPanel>
          <div class="flex items-center gap-2">
            <label id="tos-label">I confirm that I have read and agree to these terms.</label>
            <Checkbox ariaLabelledby="tos-label" v-model="checked" :binary="true" />
          </div>
          <div class="flex flex-col gap-4 items-start">
            <div v-for="(picture, index) in pictures" :key="index">
              <div class="flex items-center gap-2">
                <label id="link-label">Link to art source:</label>
                <InputText
                  aria-labelledby="link-label"
                  v-model="links[index]"
                  :disabled="!checked"
                />
              </div>
              <FileUpload
                mode="basic"
                :disabled="!checked"
                accept="image/*"
                :maxFileSize="1024 * 1024 * 15"
                customUpload
                @select="uploadedFile"
                :multiple="isAdmin"
                label="Upload an image"
              />
            </div>
            <Button v-if="isAdmin" :disabled="!checked" label="Upload More" @click="addUpload()" />
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
const links = ref([''])
const files = ref<File[]>([])
const uploading = ref(false)
const ok = computed(() => checked.value && files.value && !uploading.value)
const pictures = ref(1)
const toast = useToast()

const userStore = useUserStore()
const user = userStore.currentUser
const isAdmin = userStore.isAdmin

async function uploadedFile(e: FileUploadSelectEvent) {
  files.value.push(e.files[0])
  console.log(files.value)
  toast.add({
    severity: 'success',
    summary: 'Success',
    detail: 'File successfully uploaded.',
    life: 3000
  })
}

async function submit() {
  try {
    uploading.value = true
    if (!user) {
      toast.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'You must be logged in to submit art.',
        life: 3000
      })
      throw new Error('not logged in')
    }

    if (files.value.length != links.value.length) {
      console.log(files.value.length, links.value.length)
      toast.add({
        severity: 'warn',
        summary: 'Warning',
        detail: "You didn't attach a file.",
        life: 3000
      })
      throw new Error('there is no file')
    }
    console.log(links.value.length)

    for (let i = 0; i < links.value.length; i++) {
      const formData = new FormData()
      formData.append('type', type.value)
      formData.append('link', links.value[i])
      formData.append('image', files.value[i])
      console.log(formData)
      const res = await imageStore.uploadImage(formData)
      if (res?.ok) {
        toast.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Art successfully submitted.',
          life: 3000
        })
      } else throw new Error((await res.json()).error)
    }
    links.value = []
    files.value = []
  } catch (error) {
    console.error(error)
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Failed to submit art.',
      life: 3000
    })
  }
  uploading.value = false
}
//obviously the most important part of the code...
const tos =
  'Art: Against the Machine is an amateur project created by a group of teenage high-school students. Our primary goal is to educate and spread awareness about the issues regarding artificially generated images. Though the main focus of this project is art, the limitations of the problems regarding AI goes far and beyond just this one field. cont.'

const addUpload = () => {
  pictures.value++
}
</script>

<style scoped></style>
