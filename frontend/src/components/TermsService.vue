<template>
  <div class="tos flex flex-col rounded p-4 self-center">
    <ScrollPanel class="h-36 w-full">
      <div v-for="text in serviceTerms" :key="text">
        <p class="font-bold">{{ text.heading }}</p>
        <p v-for="words in text.text" :key="words">{{ words }}</p>
        <br />
      </div>
    </ScrollPanel>
    <p class="self-center">Scroll ↓</p>
  </div>
</template>

<script setup>
import ScrollPanel from 'primevue/scrollpanel'

const serviceTerms = [
  {
    heading: 'INTRODUCTION',
    text: [
      'Art Against the Machine is an amateur project created by a group of teenage high-school students. Our primary goal is to educate and spread awareness about the issues regarding artificially generated images. Though the main focus of this project is art, the limitations of the problems regarding AI goes far and beyond just this one field.',
      'We would also like to reiterate we do not have grievances with AI as a technology itself but how it is used.'
    ]
  },
  {
    heading: 'USER UPLOAD CONTENT',
    text: [
      'Thank you for volunteering your art! Please read the following before submitting anything.'
    ]
  },
  {
    heading: 'RULES OF UPLOAD',
    text: [
      'There is no tolerance for any depiction or implication of 18+ content, political innuendos, and harassment of any group. This includes nudity, references to suicide, sexual/suggestive content, messages of homophobia, etc.',
      'All submissions will be reviewed by our team.',
      'Only images of mild or less blood are allowed. Any further depictions of gore (bones, organs, etc.) will not be permitted.'
    ]
  },
  {
    heading: 'HOW WILL MY ART BE USED?',
    text: [
      'Speaking in an artist-to-artist manner, we will promise that your property will not be used for anything you did not consent to. By uploading your art, you agree for it to only be used in the game portion unless further discussed. Examples include AI training, selling for profit, etc. In addition, your art will be credited with the socials/name you provide upon appearance.',
      'We (once again) thank you for your contribution and support for our rag-tag team of utter losers and “the greatest computer scientist of all time (quote Richard)" ♥️'
    ]
  },
  {
    heading: 'USER DATA - WHY DO I HAVE TO REGISTER/SIGN IN?',
    text: [
      'As mentioned in the “Introduction”, our primary goal of this project is to bring exposure to the issues surrounding AI and art. Our ultimate goal of this project is to write a paper - the statistics that we collect allow us to build the “logos”. We understand that not everyone is not excited to be used as a statistic, which is why we allow everyone to play the “game” portion without making an account. However, understand that your “rights” and “wrongs” will still be data noted during gameplay.',
      'We will NOT use your data or any uploaded content for any malicious purposes: selling for profit, training AI, leaking to other persons, etc. This is just for us to accomplish our project!!'
    ]
  }
]
</script>

<style scoped>
.tos {
  @apply bg-primary-100 dark:!bg-primary-900;
}
</style>
