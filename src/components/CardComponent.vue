<template>
  <div
    class="flex flex-col justify-between bg-gradient-to-r p-4 text-white rounded-md relative w-full h-full"
    :class="
      items.is_potentially_hazardous_asteroid
        ? 'from-red-500 to-red-900'
        : 'from-indigo-500 to-indigo-900'
    "
    v-for="(items, index) in data"
    :key="index"
  >
    <img class="absolute opacity-60 top-10 right-4" width="100" src="/asteroide.png" alt="" />
    <span class="text-2xl font-bold mb-4">{{ items.name }}</span>
    <span>
      Designation: <span class="text-gray-400">{{ items.designation }}</span>
    </span>
    <span>
      Absolute magnitude: <span class="text-gray-400">{{ items.absolute_magnitude_h }}</span>
    </span>
    <span> Diameter: </span>
    <span>
      Maximum:
      <span class="text-gray-400">
        {{ items.estimated_diameter.kilometers.estimated_diameter_max }} KM
      </span>
    </span>
    <span>
      Minimum:
      <span class="text-gray-400">
        {{ items.estimated_diameter.kilometers.estimated_diameter_min }} KM
      </span>
    </span>
    <span>
      Potentially dangerous:
      <span class="text-gray-400">
        {{ items.is_potentially_hazardous_asteroid ? 'Yes' : 'No' }}
      </span>
    </span>
    <div>
      <button
        @click="navigate(items.id)"
        class="py-2 px-4 mt-6 rounded-md text-white"
        :class="
          items.is_potentially_hazardous_asteroid
            ? 'bg-red-400 hover:bg-red-500'
            : 'bg-indigo-400 hover:bg-indigo-500'
        "
      >
        See more
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function navigate(id) {
  router.push({ name: 'asteroid', params: { id: id } })
}
defineProps<{
  data: any[]
}>()
</script>
