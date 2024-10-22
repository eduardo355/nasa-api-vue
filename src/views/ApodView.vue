<template>
  <div class="flex items-center justify-center p-10">
    <LoaderComponent v-if="loader" />
    <CardApod v-else :data="data" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, computed } from 'vue'
import CardApod from '@/components/CardApod.vue'
import { useFetchingStore } from '@/stores/fetching'
import LoaderComponent from '@/components/LoaderComponent.vue'

const fetchingStore = useFetchingStore()
const { pictureOftheDay } = fetchingStore

const loader = computed(() => fetchingStore.loader)
const data = ref([])

const fetchPicture = async () => {
  const result = await pictureOftheDay()
  data.value = result
}

onMounted(fetchPicture)
</script>
