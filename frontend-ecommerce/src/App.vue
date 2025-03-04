<script setup>
import Navbar from './components/Navbar.vue'
import Sidebar from './components/Sidebar.vue'
</script>

<template>
  <Navbar />
  
  <router-view />
</template>

<style scoped>
@media (min-width: 1024px) { }
</style>
