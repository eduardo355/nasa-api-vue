<template>
  <div class="max-w-3xl w-full bg-white shadow-xl rounded-2xl p-8 space-y-6 border border-gray-200">
    <div class="flex justify-between items-start">
      <h2 class="text-3xl font-bold text-indigo-700">{{ data.title }}</h2>
      <span class="text-sm text-gray-500">{{ data.date }}</span>
    </div>

    <div class="space-y-4">
      <p class="text-xl font-semibold text-gray-800">Astronomy Picture of the Day</p>
      <img class="rounded-xl w-full object-cover shadow-md" :src="data.url" :alt="data.title" />
      <p class="text-base text-gray-700 leading-relaxed">
        {{ data.explanation }}
      </p>
    </div>

    <div class="flex justify-end">
      <a
        :href="data.hdurl"
        target="_blank"
        class="inline-flex items-center gap-2 text-indigo-600 border border-indigo-600 px-5 py-2.5 text-base rounded-lg font-medium hover:bg-indigo-600 hover:text-white transition-all duration-300"
      >
        <span>View in full resolution</span>
        <ShareIcon />
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import ShareIcon from '@/components/icons/ShareIcon.vue'

interface Props {
  title: string
  date: string
  url: string
  hdurl: string
  explanation: string
}

defineProps<{
  data: Props
}>()
</script>
