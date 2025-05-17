<template>
  <div class="flex xl:flex-row flex-col xl:space-x-10 p-6 pt-28">
    <section class="w-full">
      <div v-if="currentLoader" class="flex justify-center items-center">
        <LoaderComponent />
      </div>

      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4"
      >
        <div
          v-for="(item, index) in photosRover"
          :key="index"
          class="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <img :src="item.img_src" alt="Mars Rover Photo" class="w-full h-full object-cover" />
        </div>
      </div>

      <div class="col-span-full flex justify-center gap-6 mt-6">
        <button
          v-if="currentPage > 1"
          @click="changePage('prev')"
          class="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition"
        >
          Previous Page
        </button>
        <button
          @click="changePage('next')"
          class="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition"
        >
          Next Page
        </button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import LoaderComponent from '@/components/LoaderComponent.vue'
import { ref, onMounted, computed } from 'vue'
import { useFetchingStore } from '@/stores/fetching'
import { useRoute, useRouter } from 'vue-router'

const fetchingStore = useFetchingStore()
const { marsRoverPhotos } = fetchingStore
const router = useRouter()
const route = useRoute()

interface PhotosRoverResponse {
  img_src: string
}

const photosRover = ref<PhotosRoverResponse[]>([])
const page = ref(+route.query.page! || 1)
const loader = ref(false)

const currentPage = computed(() => page.value)
const currentLoader = computed(() => loader.value)

async function getRoverPhotos() {
  loader.value = true

  const data = await marsRoverPhotos(page.value)
  photosRover.value = data

  router.push({ name: 'marsrovers', query: { page: page.value } })
  loader.value = false
}

function changePage(direction: 'next' | 'prev') {
  if (direction === 'next') {
    page.value = page.value + 1
  } else {
    page.value = Math.max(1, page.value - 1)
  }

  getRoverPhotos()
}

onMounted(getRoverPhotos)
</script>
