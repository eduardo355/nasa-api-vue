<template>
  <div class="flex justify-between items-start">
    <span class="font-medium text-gray-700">{{ label }}</span>
    <span
      v-if="badge"
      class="bg-gray-200 text-gray-800 px-3 py-0.5 rounded-full text-sm font-semibold"
    >
      {{ value }}
    </span>
    <span v-else :class="small ? 'text-sm text-gray-500 text-right' : 'text-gray-800 text-right'">
      {{ value }}
    </span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  value: string | number
  badge?: boolean
  small?: boolean
  label: string
}>()
</script>
