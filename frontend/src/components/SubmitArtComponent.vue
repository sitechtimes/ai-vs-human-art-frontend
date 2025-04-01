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
            <InputText aria-labelledby="link-label" v-model="links[index]" :disabled="!ok" />
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
            class=""
          />
          <Button
            :disabled="!ok"
            type="submit"
            :class="`${checked ? 'cursor-pointer' : '!cursor-not-allowed'} mt-8 fixed`"
            >Submit</Button
          >
        </div>
        <Button v-if="isAdmin" :disabled="!ok" label="Upload More" @click="addUpload()" />
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
const type = ref('unscreened')
const links = ref([''])
const files = ref([])
const uploading = ref(false)
const ok = computed(() => checked.value && checked2.value && files.value && !uploading.value)
const pictures = ref(1)
const toast = useToast()

const userStore = useUserStore()
const user = userStore.currentUser
const isAdmin = userStore.isAdmin

async function uploadedFile(e) {
  files.value.push(e.files[0])
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
      toast.add({
        severity: 'warn',
        summary: 'Warning',
        detail: "You didn't attach a file or link.",
        life: 3000
      })
      throw new Error('there is no file')
    }

    for (let i = 0; i < links.value.length; i++) {
      const formData = new FormData()
      formData.append('type', type.value)
      formData.append('link', links.value[i])
      formData.append('image', files.value[i])
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
    // backend route for bulk uploads to push ina rray
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

const addUpload = () => {
  pictures.value++
}
</script>

<style scoped></style>
