<template>
  <div class="search-container">
    <input
      v-model="searchQuery"
      type="text"
      class="search-input"
      placeholder="Cari produk..."
    />
    <span class="search-icon">🔍</span>
    <button v-if="searchQuery" class="clear-button" @click="searchQuery = ''">
      ❌
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";

const searchQuery = ref("");
</script>

<style scoped>
.search-container {
  position: relative;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
}

.search-input {
  width: 100%;
  padding: 12px 40px;
  font-size: 16px;
  border: 2px solid #ccc;
  border-radius: 8px;
  outline: none;
  transition: 0.3s;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.search-input:focus {
  border-color: #007bff;
  box-shadow: 0 3px 10px rgba(0, 123, 255, 0.2);
}

.search-icon {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 18px;
  color: #777;
}

.clear-button {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  color: #999;
}

.clear-button:hover {
  color: red;
}
</style>
