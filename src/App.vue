<script setup lang="ts">
import NavComponent from '@/components/NavComponent.vue'
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <main>
    <NavComponent />
    <RouterView />
    <RouterLink to="/" />
  </main>
</template>
