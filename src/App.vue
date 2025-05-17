<script setup lang="ts">
import NavComponent from '@/components/nav-component.vue'
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <main>
    <NavComponent />
    <RouterView />
    <RouterLink to="/" />
  </main>
</template>
