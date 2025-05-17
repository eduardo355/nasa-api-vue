<template>
  <div
    v-for="(items, index) in data"
    :key="index"
    :class="[
      'flex flex-col justify-between bg-gradient-to-r p-6 text-white rounded-xl relative w-full h-full shadow-md transition-all duration-300',
      items.is_potentially_hazardous_asteroid
        ? 'from-red-600 to-red-900'
        : 'from-indigo-600 to-indigo-900'
    ]"
  >
    <img class="absolute opacity-20 top-6 right-6 w-24" src="/asteroide.png" alt="Asteroid" />

    <h2 class="text-2xl font-bold mb-2 z-10">{{ items.name }}</h2>

    <ul class="space-y-1 text-sm z-10">
      <li>
        <strong>Designation:</strong>
        <span class="text-white/70">{{ items.designation }}</span>
      </li>
      <li>
        <strong>Absolute Magnitude:</strong>
        <span class="text-white/70">{{ items.absolute_magnitude_h }}</span>
      </li>
      <li>
        <strong>Diameter (KM):</strong>
        <div class="ml-4">
          <span class="block">
            Max:
            <span class="text-white/70">
              {{ items.estimated_diameter.kilometers.estimated_diameter_max }}
            </span>
          </span>
          <span class="block">
            Min:
            <span class="text-white/70">
              {{ items.estimated_diameter.kilometers.estimated_diameter_min }}
            </span>
          </span>
        </div>
      </li>
      <li>
        <strong>Potentially Dangerous:</strong>
        <span
          class="ml-1 font-semibold"
          :class="items.is_potentially_hazardous_asteroid ? 'text-red-200' : 'text-green-200'"
        >
          {{ items.is_potentially_hazardous_asteroid ? 'Yes' : 'No' }}
        </span>
      </li>
    </ul>

    <div class="mt-6 z-10">
      <button
        @click="navigate(items.id)"
        class="w-full py-2 rounded-lg font-medium transition-colors"
        :class="
          items.is_potentially_hazardous_asteroid
            ? 'bg-red-400 hover:bg-red-500 text-white'
            : 'bg-indigo-400 hover:bg-indigo-500 text-white'
        "
      >
        See more →
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function navigate(id: string) {
  router.push({ name: 'asteroid', params: { id } })
}

defineProps<{
  data: {
    id: string
    name: string
    designation: number
    absolute_magnitude_h: number
    is_potentially_hazardous_asteroid: boolean
    estimated_diameter: {
      kilometers: {
        estimated_diameter_max: number
        estimated_diameter_min: number
      }
    }
  }[]
}>()
</script>
