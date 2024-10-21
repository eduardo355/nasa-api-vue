<template>
  <div class="flex xl:flex-row flex-col xl:space-x-10 p-4">
    <div class="flex flex-col xl:w-[15%] p-4 space-y-4">
      <h2 class="text-2xl font-semibold">Filter's</h2>
      <span v-if="selectedCamera" class="bg-gray-200 py-2 px-4 rounded-lg flex justify-between">
        {{ selectedCamera }}
        <button @click="filterCamera(true)" class="font-bold">X</button>
      </span>
      <select
        name=""
        id=""
        v-on:change="filterCamera(false)"
        v-model="selectedCamera"
        :value="selectedCamera"
        class="focus:outline-none border border-gray-200 px-4 py-2 rounded-lg"
      >
        <option v-for="(item, index) in cameras" :key="index" :value="item.name" default>
          {{ item.full_name }}
        </option>
      </select>
    </div>
    <div class="flex justify-center items-center w-full" v-if="loader">
      <LoaderComponent />
    </div>
    <div
      v-if="!loader"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 place-items-center xl:w-[85%]"
    >
      <div v-for="(item, index) in data" :key="index">
        <img :src="item.img_src" alt="" class="w-full h-full rounded-xl" />
      </div>
      <div
        class="space-x-6 col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4 2xl:col-span-5 py-4"
      >
        <button
          v-if="currentPage > 1"
          @click="previousPage"
          class="px-4 py-2 bg-blue-500 text-white rounded-xl font-semibold"
        >
          Previous Page
        </button>
        <button @click="nextPage" class="px-4 py-2 bg-blue-500 text-white rounded-xl font-semibold">
          Next Page
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import LoaderComponent from '@/components/LoaderComponent.vue'
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useFetchingStore } from '@/stores/fetching'

interface MarsRoverPhoto {
  img_src: string
}

const fetchingStore = useFetchingStore()
const { marsRoverPhotos, marsRoverPhotosByCamera } = fetchingStore
const router = useRouter()
const route = useRoute()

const cameras = ref([])
const data = ref<MarsRoverPhoto[]>([])
const loader = computed(() => fetchingStore.loader)
const selectedCamera = ref(route.query.camera || '')
const currentPage = ref(Number(route.query.page) || 1)

const filterCamera = (reset) => {
  if (reset) {
    selectedCamera.value = ''
    router.push({ path: '/marsrovers', query: { page: currentPage.value } })
    getMarsRoverPhotos(currentPage.value)
    return
  }
  router.push({
    path: '/marsrovers',
    query: { page: currentPage.value, camera: selectedCamera.value }
  })
  getMarsRoverByCamera(selectedCamera.value)
}

const nextPage = () => {
  currentPage.value++
  if (selectedCamera.value) {
    getMarsRoverByCamera(selectedCamera.value)
    router.push({
      path: '/marsrovers',
      query: { page: currentPage.value, camera: selectedCamera.value }
    })
  } else {
    getMarsRoverPhotos(currentPage.value)
    router.push({ path: '/marsrovers', query: { page: currentPage.value } })
  }
}

const previousPage = () => {
  currentPage.value--
  if (selectedCamera.value) {
    getMarsRoverByCamera(selectedCamera.value)
    router.push({
      path: '/marsrovers',
      query: { page: currentPage.value, camera: selectedCamera.value }
    })
  } else {
    getMarsRoverPhotos(currentPage.value)
    router.push({ path: '/marsrovers', query: { page: currentPage.value } })
  }
}

const getMarsRoverByCamera = async (camera: string) => {
  const result = await marsRoverPhotosByCamera(currentPage.value, camera)
  if (result) {
    data.value = result
    if (result.length > 0) cameras.value = result[0].rover.cameras
  }
}

const getMarsRoverPhotos = async (currentPage: number) => {
  const result = await marsRoverPhotos(currentPage)
  if (result) {
    data.value = result
    cameras.value = result[0].rover.cameras
  }
}

onMounted(() => {
  if (selectedCamera.value) {
    getMarsRoverByCamera(selectedCamera.value)
  } else {
    getMarsRoverPhotos(currentPage.value)
  }
})
</script>
