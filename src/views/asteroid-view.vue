<template>
  <div class="pt-6">
    <div class="xl:col-span-4 lg:col-span-3 md:col-span-2 col-span-1" v-if="loader">
      <LoaderComponent />
    </div>
    <CardAsteroidByIdComponent v-if="data" :data="data" />
  </div>
</template>

<script setup lang="ts">
import CardAsteroidByIdComponent from '@/components/card-asteroid-by-id-component.vue'
import LoaderComponent from '@/components/LoaderComponent.vue'
import { useFetchingStore } from '@/stores/fetching'
import { onMounted, ref, computed } from 'vue'

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
