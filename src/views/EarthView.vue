<template>
  <div class="flex flex-col justify-center items-center h-full">
    <h2 class="text-4xl font-bold">Earth</h2>
    <p>Image taken at longitude: {{ lon }} and latitude: {{ lat }} on date: {{ date }}</p>
    <img class="w-[500px] mt-5" :src="img" alt="" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
navigator.geolocation.getCurrentPosition(success, error)

const img = ref('')
const lat = ref('')
const lon = ref('')
const date = ref('')

const currentDate = new Date()
const formattedDate = currentDate.toLocaleDateString('es-ES').split('/')
date.value = `${formattedDate[2]}-${formattedDate[1]}-${formattedDate[0]}`

async function success(position) {
  lat.value = position.coords.latitude
  lon.value = position.coords.longitude
  try {
    const response = await fetch(
      `https://api.nasa.gov/planetary/earth/imagery?lon=${lon.value}&lat=${lat.value}&date=${date.value}&api_key=xO15lhanHARD6LlOCuvcLDbWgKt0cmXLr3nTaoKR`
    )
    const blob = await response.blob()
    const url = URL.createObjectURL(blob)
    img.value = url
  } catch (error) {
    console.log(error)
  }
}

function error(error) {
  console.log(error)
}
</script>
