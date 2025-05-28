<script setup>
import { ref } from 'vue'
import Button from '@/components/button/Button.vue'

const brand = ref('')
const themeColor = ref('#000000')
const iconFiles = ref(null)
const logoFiles = ref(null)

const imageUpload = (e, type) => {
  const files = e.target.files
  if (type === 'icon') iconFiles.value = files
  if (type === 'logo') logoFiles.value = files
}

const saveSettings = () => {
  console.log({
    brand: brand.value,
    themeColor: themeColor.value,
    iconFiles: iconFiles.value,
    logoFiles: logoFiles.value
  })
}
</script>

<template>
  <div class="form-container">
    <div class="form-group">
      <label for="icon">Icon</label>
      <input type="file" @change="e => imageUpload(e, 'icon')" multiple />
    </div>

    <div class="form-group">
      <label for="logo">Logo</label>
      <input type="file" @change="e => imageUpload(e, 'logo')" multiple />
    </div>

    <div class="form-group">
      <label for="brand">Nama Toko</label>
      <input type="text" id="brand" v-model="brand" placeholder="Nama toko kamu" />
    </div>

    <div class="form-group">
      <label for="color">Theme Color</label>
      <input type="color" id="color" v-model="themeColor" />
    </div>

    <Button @click="saveSettings">Simpan</Button>
  </div>
</template>

<style scoped>
.form-container {
  width: 100%;
  max-width: 1000px;
  margin: 2rem auto;
  padding: 2rem;
  border-radius: 12px;
  background-color: #ffffff;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.4rem;
  font-weight: 600;
}

input[type="text"],
input[type="file"],
input[type="color"] {
  width: 100%;
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

input[type="color"] {
  padding: 0;
  height: 40px;
  width: 60px;
}
</style>
