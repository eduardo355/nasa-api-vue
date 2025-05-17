<template>
  <nav
    class="bg-white shadow-md px-6 py-4 flex justify-between items-center fixed top-0 z-50 w-full"
  >
    <router-link to="/" class="flex items-center gap-4">
      <img src="/nasa-logo.png" alt="NASA Logo" class="w-12 h-12 object-contain" />
      <h1 class="text-2xl font-bold text-gray-800">NASA</h1>
    </router-link>

    <ul class="flex items-center gap-4">
      <li>
        <router-link
          to="/apod"
          class="px-4 py-2 rounded-lg text-base font-medium transition-colors duration-200"
          :class="{
            'bg-blue-100 text-blue-700 font-semibold': pathName === 'apod',
            'text-gray-700 hover:bg-gray-100': pathName !== 'apod'
          }"
        >
          Picture of the Day
        </router-link>
      </li>

      <li>
        <router-link
          to="/marsrovers?page=1"
          class="px-4 py-2 rounded-lg text-base font-medium transition-colors duration-200"
          :class="{
            'bg-blue-100 text-blue-700 font-semibold': pathName === 'marsrovers',
            'text-gray-700 hover:bg-gray-100': pathName !== 'marsrovers'
          }"
        >
          Mars Rover Photos
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const pathName = computed(() => route.name)
</script>
