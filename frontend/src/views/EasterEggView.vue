<template>
  <div>
    <h1 class="text-5xl text-center pt-5">The Team</h1>
    <p class="text-center italic">lines next to each other are simultaneous</p>
    <div class="flex flex-col mx-auto px-0 xl:w-11/12">
      <div class="flex flex-col pt-4" v-for="time in Object.keys(lyrics)" :key="time">
        <div class="flex flex-row gap-2 w-11/12 flex-wrap justify-between pb-4 mx-auto">
          <LawrenceComponent
            v-for="line in lyrics[Number(time)]"
            class="w-fit grow"
            :key="time + line.singer + line.line"
            :name="line.singer"
            :color="singerColor[line.singer]"
            :yap="line.line"
            :image="`/${line.singer}.png`"
          ></LawrenceComponent>
        </div>
        <hr class="border-2 rounded-full w-full" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import LawrenceComponent from '../components/LyricComponent.vue'
type Line = {
  line: string
  singer: string
  time: number
}

const lyrics: { [key: number]: Line[] } = {
  '2': [
    {
      line: 'nani sono me yappa sono me',
      singer: 'mafuyu',
      time: 2
    }
  ],
  '4': [
    {
      line: 'hajimemashite ja nai ne',
      singer: 'ena',
      time: 4
    }
  ],
  '6': [
    {
      line: 'nani sono me mou yamete',
      singer: 'kanade',
      time: 6
    }
  ],
  '8': [
    {
      line: 'kawaii dake nano ni tsumi no aji',
      singer: 'mizuki',
      time: 8
    }
  ],
  '11': [
    {
      line: 'zureru zureru kuzureru',
      singer: 'KAITO',
      time: 11
    }
  ],
  '13': [
    {
      line: 'zureru',
      singer: 'ena',
      time: 13
    }
  ],
  '14': [
    {
      line: 'ki ga fureru',
      singer: 'mafuyu',
      time: 14
    }
  ],
  '16': [
    {
      line: 'himitsu hitotsu de kuzureru',
      singer: 'kanade',
      time: 16
    }
  ],
  '18': [
    {
      line: 'kowareru, gomen',
      singer: 'mizuki',
      time: 18
    }
  ],
  '22': [
    {
      line: 'minaide rikai dekinai deshou?<br />marude saite shimatta bake no hana',
      singer: 'KAITO',
      time: 22
    },
    {
      line: 'minaide rikai dekinai deshou?<br />marude saite shimatta bake no hana',
      singer: 'kanade',
      time: 22
    }
  ],
  '25': [
    {
      line: 'nani mo ienai kakikesenai<br />donna ni minikuku utsuru keshou',
      singer: 'ena',
      time: 25
    }
  ],
  '29': [
    {
      line: 'minaide rikai dekinai deshou?<br />marude saite shimatta bake no hana',
      singer: 'KAITO',
      time: 29
    },
    {
      line: 'minaide rikai dekinai deshou?<br />marude saite shimatta bake no hana',
      singer: 'mafuyu',
      time: 29
    }
  ],
  '31': [
    {
      line: 'tsubomi ni wa mou',
      singer: 'KAITO',
      time: 31
    },
    {
      line: 'tsubomi ni wa mou',
      singer: 'mizuki',
      time: 31
    }
  ],
  '32': [
    {
      line: 'modorenai',
      singer: 'mizuki',
      time: 32
    }
  ],
  '35': [
    {
      line: 'nani sono me yappa sono me',
      singer: 'KAITO',
      time: 35
    }
  ],
  '37': [
    {
      line: 'dattara kiete minna inaku nare',
      singer: 'mizuki',
      time: 37
    }
  ],
  '39': [
    {
      line: 'inaku nare',
      singer: 'KAITO',
      time: 39
    },
    {
      line: 'inaku nare',
      singer: 'mizuki',
      time: 39
    }
  ],
  '40': [
    {
      line: 'inaku nare',
      singer: 'mizuki',
      time: 40
    }
  ],
  '42': [
    {
      line: 'inaku nare',
      singer: 'KAITO',
      time: 42
    },
    {
      line: 'inaku nare',
      singer: 'mizuki',
      time: 42
    }
  ],
  '43': [
    {
      line: 'soba ni ite',
      singer: 'mizuki',
      time: 43
    }
  ],
  '47': [
    {
      line: 'minaide rikai dekinai deshou?<br />marude',
      singer: 'kanade',
      time: 47
    },
    {
      line: 'minaide rikai dekinai deshou?<br />marude',
      singer: 'mafuyu',
      time: 47
    }
  ],
  '48': [
    {
      line: 'saite shimatta bake no hana',
      singer: 'KAITO',
      time: 48
    },
    {
      line: 'saite shimatta bake no hana',
      singer: 'kanade',
      time: 48
    },
    {
      line: 'saite shimatta bake no hana',
      singer: 'mafuyu',
      time: 48
    }
  ],
  '51': [
    {
      line: 'nani mo ienai kakikesenai<br />donna ni minikuku utsuru keshou',
      singer: 'KAITO',
      time: 51
    },
    {
      line: 'nani mo ienai kakikesenai<br />donna ni minikuku utsuru keshou',
      singer: 'ena',
      time: 51
    }
  ],
  '58': [
    {
      line: 'mirai de rikai sarenai nara<br />koko de sassato kiete bake no hana<br />umareta batsu wo owarasu you ni <br />kokyuu wo tomete <br />aa',
      singer: 'KAITO',
      time: 58
    },
    {
      line: 'mirai de rikai sarenai nara<br />koko de sassato kiete bake no hana<br />umareta batsu wo owarasu you ni <br />kokyuu wo tomete <br />aa',
      singer: 'mizuki',
      time: 58
    }
  ],
  '59': [
    {
      line: 'mou ii ya',
      singer: 'mizuki',
      time: 59
    }
  ]
}

const colorSinger = {
  'rgb(51, 204, 186)': 'miku',
  'rgb(51, 103, 205)': 'KAITO',
  'rgb(187, 101, 136)': 'kanade',
  'rgb(228, 168, 202)': 'mizuki',
  'rgb(204, 170, 135)': 'ena',
  'rgb(136, 137, 204)': 'mafuyu'
}

const singerColor = Object.assign({}, ...Object.entries(colorSinger).map(([a, b]) => ({ [b]: a })))

// GENERATION SCRIPT:
// go to a song's fandom page (like https://projectsekai.fandom.com/wiki/Bad_Apple!!_feat.SEKAI)
// do this in console document.querySelector(".copy-to-clipboard-text > p").innerHTML
// this will steal the lyrics as html. right click > copy string contents
// remove the /* before const html
// paste the html into the const html backticks
// check console for anyone you need to add to colorSinger above (it will error with the rgb value)
// add picture to the public folder with file name being singer's name
// console will log the lyrics as an object. paste this into the lyrics object above
// empty the backticks. do not upload lyric html to github
// put the /* back before const html

/* const html = ``

import { reactive } from 'vue'
import DOMPurify from 'dompurify'

const lyricsElement = document.createElement('p')
// xss is bad actually. v-html doesn't sanitize
lyricsElement.innerHTML = DOMPurify.sanitize(html)

let time = 0

const lyrics: { [key: number]: Line[] } = reactive({})

function getLyric(html: HTMLElement) {
  if (['img', 'a'].includes(html.tagName.toLowerCase())) return // these aren't lyrics
  if (html.tagName.toLowerCase() === 'br') {
    time++
    return
  }
  if (html.tagName.toLowerCase() === 'span' && html.classList.contains('tooltip-contents')) return //this is the singer hover span
  // it's an actual lyric. proceed
  time++
  if (html.children.length > 0) {
    Array.from(html.children).forEach((el) => getLyric(el as HTMLElement))
  }

  lyrics[time] ??= []

  html.innerText = String(html.innerText).replace(/\n/g, `<br />`)

  if (html.style.color) {
    const singer = colorSinger[html.style.color as keyof typeof colorSinger]
    if (!singer) console.error("couldn't find", html.style.color)
    const exists = lyrics[time].filter((lyric) => lyric.singer === singer)
    if (exists.length > 0) exists[0].line += ' ' + html.innerText
    else
      lyrics[time].push({
        line: html.innerText,
        singer: singer,
        time: time
      })
    return
  }
  // handle multiple singers: html.style.background
  let matchColors = /rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/g
  const match = html.style.background.match(matchColors)

  match?.forEach((color) => {
    const singer = colorSinger[color as keyof typeof colorSinger]
    if (!singer) console.error("couldn't find", color)
    const exists = lyrics[time].filter((lyric) => lyric.singer === singer)
    if (exists.length > 0) exists[0].line += ' ' + html.innerText
    else
      lyrics[time].push({
        line: html.innerText,
        singer: singer,
        time: time
      })
  })
}

Array.from(lyricsElement.children).forEach((el) => getLyric(el as HTMLElement))
console.log(lyrics)
// */
</script>

<style scoped></style>
