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
          v-for="index in pictures"
          :key="index"
          class="flex flex-col border-2 p-8 rounded-lg w-auto"
        >
          <div class="items-center gap-2 mb-4">
            <label id="link-label" class="mr-2">Link to art source:</label>
            <InputText aria-labelledby="link-label" v-model="links[index - 1]" :disabled="!ok" />
          </div>
          <FileUpload
            mode="basic"
            :disabled="!ok"
            accept="image/*"
            :maxFileSize="1024 * 1024 * 15"
            customUpload
            @select="uploadedFile"
            :multiple="isAdmin"
            label="Upload an image"
          />
        </div>
        <Button
          v-if="isAdmin"
          :disabled="!ok"
          label="Upload More"
          @click="pictures++"
          class="mt-8"
        />
        <Button
          :disabled="!ok"
          type="submit"
          :class="`${checked ? 'cursor-pointer' : '!cursor-not-allowed'}  fixed`"
          >Submit</Button
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
const links = ref([])
const files = ref([])
const uploading = ref(false)
const ok = computed(() => checked.value && checked2.value && files.value && !uploading.value)
const pictures = ref(1)
const toast = useToast()
const allForms = ref([])

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

const uploadedFile = (e) => {
  files.value.push(e.files[0])
  addToast('success', 'Success', 'File sucessfully uploaded.')
}

const submit = async () => {
  uploading.value = true
  if (!user) {
    addToast('warn', 'Warning', 'You must be logged in to submit art.')
    throw new Error('not logged in')
  }
  console.log(files.value, links.value)
  if (files.value.length != links.value.length) {
    addToast('warn', 'Warning', "You didn't attach a file.")
    throw new Error('there is no file')
  }

  for (let i = 0; i < links.value.length; i++) {
    const formData = new FormData()
    formData.append('type', 'unscreened')
    formData.append('link', links.value[i])
    formData.append('image', files.value[i])
    console.log(formData.link, formData.image)
    allForms.value.push(formData)
    console.log(allForms.value[i])
  }
  const res = await imageStore.uploadImage(allForms.value[0])
  if (!res.ok) {
    addToast('error', 'Error', 'Failed to submit art.')
    throw new Error((await res.json()).error)
  }
  addToast('success', 'Success', 'Art successfully submitted.')
  links.value = []
  files.value = []
  allForms.value = []

  uploading.value = false
}
</script>

<style scoped></style>
