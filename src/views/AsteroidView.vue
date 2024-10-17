<template>
  <div class="xl:col-span-4 lg:col-span-3 md:col-span-2 col-span-1" v-if="loader">
    <LoaderComponent />
  </div>
  <CardByIdComponent v-if="data" :data="data" />
</template>

<script setup lang="ts">
import { useFetchingStore } from '@/stores/fetching'
import { defineProps, onMounted, ref, computed } from 'vue'
import LoaderComponent from '@/components/LoaderComponent.vue'
import CardByIdComponent from '@/components/CardByIdComponent.vue'

const useFetching = useFetchingStore()
const { asteroidById } = useFetching

const data = ref(null)
const loader = computed(() => useFetching.loader)

async function fetchData() {
  const asteroid = await asteroidById(props.id)
  data.value = asteroid
}
onMounted(fetchData)

const props = defineProps<{
  id: string
}>()
</script>
