<template>
  <nav class="flex justify-between p-4">
    <div class="flex items-center">
      <img src="/nasa-logo.png" width="70" alt="" />
      <h1 class="text-2xl font-bold">NASA - API</h1>
    </div>
    <ul class="flex items-center space-x-4">
      <li
        class="hover:bg-gray-200 px-4 py-2 rounded-xl text-lg font-semibold"
        :class="pathName === 'apod' && 'bg-gray-200 px-4 py-2 rounded-xl'"
      >
        <router-link to="/apod">Picture of the day</router-link>
      </li>
      <li
        class="hover:bg-gray-200 px-4 py-2 rounded-xl text-lg font-semibold"
        :class="pathName === 'marsrovers' && 'bg-gray-200 px-4 py-2 rounded-xl'"
      >
        <router-link to="/marsrovers?page=1">Mars Rover Photos</router-link>
      </li>
      <!-- <li class="hover:underline">
        <router-link to="/asteroids">Asteroids - NeoWs</router-link>
      </li> -->
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const pathName = computed(() => route.name)
</script>
