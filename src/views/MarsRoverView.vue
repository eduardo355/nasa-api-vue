<template>
  <div class="grid grid-cols-5 grid-rows-5 gap-4 p-4">
    <div class="row-span-5 shadow-lg p-4 space-y-4">
      <span class="text-3xl font-bold">Filter</span>
      <label class="flex flex-col w-full text-lg" for="selected-rover">
        <span>Rover</span>
        <select class="focus:outline-none border border-gray-200 p-2 rounded-md" name="" id="">
          <option value="" default>Selected Rover</option>
        </select>
      </label>
      <label class="flex flex-col w-full text-lg" for="selected-camera">
        <span>Camera</span>
        <select class="focus:outline-none border border-gray-200 p-2 rounded-md" name="" id="">
          <option value="" default>Selected Camera</option>
        </select>
      </label>
    </div>

    <div class="col-span-4 row-span-5">
      <div class="grid grid-cols-5 gap-2">
        <div v-for="(items, index) in data" :key="index">
          <img class="h-full" :src="items.img_src" alt="Mars Rover Photo" />
        </div>
      </div>
      <div>
        <button class="bg-blue-500 text-white p-2 rounded-md" @click="changePageMars(1)">
          Load More
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue'
import { useFetchingStore } from '@/stores/fetching'
import { useRoute, useRouter } from 'vue-router'
const fetchingStore = useFetchingStore()
const { marsRoverPhotos, changePageMars } = fetchingStore

const route = useRoute()
const currentPage = route.query.page || '1'
const router = useRouter()

const data = ref([])

const handleCurrentPage = () => {
  router.push('/marsrovers?page=' + currentPage.value)
}

const fetchMarsRoverPhotos = async () => {
  const result = await marsRoverPhotos()
  handleCurrentPage()
  data.value = result
}

onMounted(fetchMarsRoverPhotos)
watch(currentPage, fetchMarsRoverPhotos)
</script>
