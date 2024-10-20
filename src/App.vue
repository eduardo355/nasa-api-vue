<script setup lang="ts">
import NavComponent from '@/components/NavComponent.vue'
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <main class="h-screen">
    <NavComponent />
    <RouterView />
    <RouterLink to="/" />
  </main>
</template>
