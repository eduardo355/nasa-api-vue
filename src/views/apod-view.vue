<template>
  <div class="flex items-center justify-center pb-28 pt-28">
    <LoaderComponent v-if="loader" />
    <CardApod v-if="data" :data="data" />
  </div>
</template>

<script lang="ts" setup>
import LoaderComponent from '@/components/LoaderComponent.vue'
import { useFetchingStore } from '@/stores/fetching'
import CardApod from '@/components/card-apod.vue'
import { onMounted, ref, computed } from 'vue'

const fetchingStore = useFetchingStore()
const { pictureOftheDay } = fetchingStore

const loader = computed(() => fetchingStore.loader)
const data = ref<PictureResponse | null>(null)

interface PictureResponse {
  explanation: string
  hdurl: string
  title: string
  date: string
  url: string
}

const fetchPicture = async () => {
  const result: PictureResponse = await pictureOftheDay()
  data.value = result
}

onMounted(fetchPicture)
</script>
