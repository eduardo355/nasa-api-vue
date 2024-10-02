<script setup lang="ts">
import NavComponent from '@/components/NavComponent.vue'
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <NavComponent />
  <div>
    <RouterLink to="/" />
    <RouterView />
  </div>
</template>
