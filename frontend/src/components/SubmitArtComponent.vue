<template>
  <div class="flex flex-col gap-4 items-center m-8">
    <h2 class="text-xl underline self-center font-bold">TERMS OF SERVICE & FAQ</h2>
    <TermsService />
    <div class="flex items-center gap-2 mt-4">
      <label id="tos-label">I confirm that I have read and agree to these terms.</label>
      <Checkbox ariaLabelledby="tos-label" v-model="checked" :binary="true" />
    </div>
    <div class="flex items-center gap-2 mb-4">
      <label id="tos-label"
        >I confirm that I have not uploaded any NSFW/suggestive, heavy gore, nor hateful
        content.</label
      >
      <Checkbox ariaLabelledby="tos-label" v-model="checked2" :binary="true" />
    </div>
    <form @submit.prevent="submit">
      <div class="flex flex-auto flex-col gap-4 items-center w-full">
        <div
          v-for="(picture, index) in pictures"
          :key="index"
          class="flex flex-col border-2 p-8 rounded-lg w-auto"
        >
          <div class="items-center gap-2 mb-4">
            <label id="link-label" class="mr-2">Link to art source:</label>
            <InputText aria-labelledby="link-label" v-model="picture.link" :disabled="!ok" />
          </div>
          <div class="items-center gap-2 mb-4">
            <label id="link-label" class="mr-2">Artist Name:</label>
            <InputText aria-labelledby="link-label" v-model="picture.name" :disabled="!ok" />
          </div>
          <FileUpload
            mode="basic"
            :disabled="!ok"
            accept="image/*"
            :maxFileSize="1024 * 1024 * 15"
            customUpload
            @select="uploadedFile($event, index)"
            label="Upload an image"
          />
        </div>
        <Button
          v-if="isAdmin"
          :disabled="!ok"
          label="Upload More"
          @click="addNewPicture"
          class="mt-8"
        />
        <Button
          :disabled="!ok"
          type="submit"
          :class="`${checked ? 'cursor-pointer' : '!cursor-not-allowed'}  fixed`"
        >
          Submit</Button
        >
        <Toast />
      </div>
    </form>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import InputText from 'primevue/inputtext'
import FileUpload from 'primevue/fileupload'
import Checkbox from 'primevue/checkbox'
import Button from 'primevue/button'
import { useImageStore } from '../stores/images'
import { useUserStore } from '../stores/user'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import TermsService from './TermsService.vue'

const imageStore = useImageStore()

const checked = ref(false)
const checked2 = ref(false)
const uploading = ref(false)
const ok = computed(() => checked.value && checked2.value && pictures.value && !uploading.value)
const toast = useToast()
const pictures = ref([
  {
    link: '',
    name: '',
    file: ''
  }
])

const addNewPicture = () => {
  pictures.value.push({
    link: '',
    name: '',
    file: ''
  })
}

const userStore = useUserStore()
const user = userStore.currentUser
const isAdmin = userStore.isAdmin

const addToast = (severity, summary, detail) => {
  toast.add({
    severity: severity,
    summary: summary,
    detail: detail,
    life: 3000
  })
}

const uploadedFile = (e, index) => {
  pictures.value[index].file = e.files[0]
  addToast('success', 'Success', 'File sucessfully uploaded.')
}

const submit = async () => {
  uploading.value = true
  if (!user) {
    addToast('warn', 'Warning', 'You must be logged in to submit art.')
    throw new Error('not logged in')
  }
  pictures.value.forEach((picture) => {
    if (picture.link === '' || picture.name === '' || picture.file === '') {
      addToast('warn', 'Warning', 'Field is missing, all inputs are required.')
      return
    }
  })

  const formData = new FormData()
  pictures.value.forEach((picture) => {
    formData.append(`tag`, picture.link)
    formData.append(`name`, picture.name)
    formData.append(`image`, picture.file)
  })
  formData.append('type', 'unscreened')

  const res = await imageStore.uploadImage(formData)
  if (!res.ok) {
    addToast('error', 'Error', 'Failed to submit art.')
    throw new Error((await res.json()).error)
  }
  addToast('success', 'Success', 'Art successfully submitted.')
  pictures.value = [
    {
      link: '',
      name: '',
      file: ''
    }
  ]
  uploading.value = false
}
</script>

<style scoped></style>
