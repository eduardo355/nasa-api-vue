<template>
  <div class="shadow-lg rounded-lg w-3/4 p-6 space-y-6">
    <div class="flex justify-between">
      <h2 class="text-3xl font-bold text-blue-800">{{ data.title }}</h2>
      <small>{{ data.date }}</small>
    </div>
    <div>
      <span class="text-xl font-semibold">Astronomy Picture of the Day</span>
      <img class="rounded-lg w-full" :src="data.url" :alt="data.title" />
      <p class="text-lg py-4">{{ data.explanation }}.</p>
    </div>
    <div class="flex justify-end">
      <a
        target="_blank"
        class="flex items-center space-x-4 text-blue-500 border border-blue-500 px-6 py-3 text-lg rounded-lg font-semibold hover:bg-blue-500 hover:text-white transition-all"
        :href="data.hdurl"
      >
        <span> View full resolution </span>
        <ShareIcon />
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import ShareIcon from '@/components/icons/ShareIcon.vue'
defineProps<{
  data: any
}>()
</script>
