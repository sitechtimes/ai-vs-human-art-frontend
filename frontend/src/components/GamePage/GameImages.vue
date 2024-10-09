<template>
  <div class="flex flex-row">
    <AdvancedImage :cldImg="Img1" class="flex m-7 h-[30vw]" />
    <AdvancedImage :cldImg="Img2" class="flex m-7 h-[30vw]" />
  </div>
</template>

<script setup lang="ts">
import { Cloudinary } from '@cloudinary/url-gen'
import { AdvancedImage } from '@cloudinary/vue'
import { fill } from '@cloudinary/url-gen/actions/resize'

// Create a Cloudinary instance and set your cloud name.
const cld = new Cloudinary({
  cloud: {
    cloudName: 'dbrjbu4kt'
  }
})

// Instantiate a CloudinaryImage object for the image with the public ID, 'docs/models'.
const Img1 = cld.image('cld-sample-5')
const Img2 = cld.image('cld-sample-4')

// Resize to 250 x 250 pixels using the 'fill' crop mode.
Img1.resize(fill().width(250).height(250))
Img2.resize(fill().width(250).height(250))
</script>

<style scoped></style>
