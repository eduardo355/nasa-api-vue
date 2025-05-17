<template>
  <main class="p-6 pt-28 min-h-screen bg-gray-50">
    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-center items-start"
    >
      <div v-if="loader" class="col-span-full flex justify-center items-center py-10">
        <LoaderComponent />
      </div>

      <CardAsteroidComponent v-if="data.length > 0" :data="data" />

      <div v-if="!loader" class="col-span-full flex justify-center gap-4 mt-4">
        <button
          v-if="currentPage > 0"
          @click="changePage(-1)"
          class="px-5 py-2 rounded-lg bg-indigo-600 text-white font-medium shadow hover:bg-indigo-700 transition"
        >
          ← Previous
        </button>

        <button
          @click="changePage(1)"
          class="px-5 py-2 rounded-lg bg-indigo-600 text-white font-medium shadow hover:bg-indigo-700 transition"
        >
          Next →
        </button>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import CardAsteroidComponent from '@/components/card-asteroid-component.vue'
import LoaderComponent from '@/components/LoaderComponent.vue'
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
