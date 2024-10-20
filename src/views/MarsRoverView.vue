<template>
  <div class="flex space-x-10">
    <div class="flex flex-col w-[15%] p-4">
      <h2 class="text-2xl font-semibold">Filter</h2>
      <select name="" id="">
        <option value="">option</option>
      </select>
    </div>

    <div class="flex justify-center items-center w-[85%]" v-if="loader">
      <LoaderComponent />
    </div>

    <div
      v-if="!loader"
      class="grid grid-cols-5 gap-2 p-4 place-items-center grid-flow-row-dense w-[85%]"
    >
      <div v-for="(item, index) in data" :key="index" class="h-full">
        <img :src="item.img_src" alt="" class="w-full h-full rounded-xl" />
      </div>
      <div class="space-x-6 col-span-5 py-4">
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
const { marsRoverPhotos } = fetchingStore
const router = useRouter()
const route = useRoute()

const loader = computed(() => fetchingStore.loader)
const currentPage = ref(Number(route.query.page) || 1)
const data = ref<MarsRoverPhoto[]>([])

const nextPage = () => {
  currentPage.value++
  router.push({ path: '/marsrovers', query: { page: currentPage.value } })
  getMarsRoverPhotos(currentPage.value)
}

const previousPage = () => {
  currentPage.value--
  router.push({ path: '/marsrovers', query: { page: currentPage.value } })
  getMarsRoverPhotos(currentPage.value)
}

const getMarsRoverPhotos = async (currentPage: number) => {
  const result = await marsRoverPhotos(currentPage)
  if (result) {
    data.value = result
  }
}

onMounted(() => {
  getMarsRoverPhotos(currentPage.value)
})
</script>
