<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";

const title = ref("");
onMounted(async () => {
  try {
    const response = await axios.get("http://localhost:9887/api/setting/getsetting");
    
    // Ambil langsung title dari data
    const settings = response.data.data;

    if (settings.title) {
      title.value = settings.title;
      document.title = title.value;
    } else {
      console.warn("Title tidak ditemukan di response");
    }

  } catch (error) {
    console.error("Gagal mengambil setting:", error);
  }
});
</script>

<template>
  <router-view />
</template>

<style>
html,
body,
#app {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
</style>
