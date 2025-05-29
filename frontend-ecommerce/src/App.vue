<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
import { useSettingStore } from "./stores/settingStore.js";

const useSetting = useSettingStore()

onMounted( async () => {
  await useSetting.getTitle();
  await useSetting.getData()
  await useSetting.getIcon(useSetting.dataSetting.icon)
})
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
