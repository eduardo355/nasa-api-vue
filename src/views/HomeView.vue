<template>
  <main class="p-6">
    <div
      class="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 place-content-center place-items-center gap-6"
    >
      <div class="xl:col-span-4 lg:col-span-3 md:col-span-2 col-span-1" v-if="loader">
        <LoaderComponent />
      </div>
      <CardAsteroidComponent v-if="data.length > 0" :data="data" />
      <div v-if="!loader" class="xl:col-span-4 lg:col-span-3 md:col-span-2 col-span-1 space-x-4">
        <button
          v-if="currentPage > 0"
          @click="changePage(-1)"
          class="bg-gradient-to-r from-indigo-500 to-indigo-900 text-neutral-400 border border-indigo-300 border-b-4 font-medium px-4 py-2 rounded-md hover:text-white"
        >
          Previous page
        </button>
        <button
          @click="changePage(1)"
          class="bg-gradient-to-r from-indigo-500 to-indigo-900 text-neutral-400 border border-indigo-300 border-b-4 font-medium px-4 py-2 rounded-md hover:text-white"
        >
          Next page
        </button>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import LoaderComponent from '@/components/LoaderComponent.vue'
import CardAsteroidComponent from '@/components/CardAsteroidComponent.vue'
import { ref, computed, onMounted, watch } from 'vue'
import { useFetchingStore } from '@/stores/fetching'

const useFetching = useFetchingStore()
const { fetchingApi, changePage } = useFetching

const currentPage = computed(() => useFetching.page)
const loader = computed(() => useFetching.loader)
const data = ref([])

async function fetchData() {
  data.value = []
  const result = await fetchingApi()
  if (result) {
    data.value = result
  }
}

onMounted(fetchData)
watch(currentPage, fetchData)
</script>
