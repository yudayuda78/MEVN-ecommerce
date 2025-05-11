<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';

// External stores & components
import { useProductStore } from '@/stores/productStore';
import Sidebar from '../components/Sidebar.vue';
import Product from '../components/Product.vue';
import Navbar from '../components/Navbar.vue';

// State & store setup
const route = useRoute();
const productStore = useProductStore();
const { searchQuery, currentPage, lastPage } = storeToRefs(productStore);
const jenis = ref('men');

// Initial fetch
onMounted(() => {
  productStore.fetchProducts(jenis.value, [], [], 10000, 5000000, searchQuery.value, currentPage.value);
});

// Watch search query changes
watch(searchQuery, () => {
  productStore.fetchProducts(jenis.value, [], [], 10000, 5000000, searchQuery.value, currentPage.value);
});

// Pagination handlers
const nextPage = () => {
  if (currentPage.value < lastPage.value) {
    currentPage.value++;
    productStore.fetchProducts(jenis.value, [], [], 10000, 5000000, searchQuery.value, currentPage.value);
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    productStore.fetchProducts(jenis.value, [], [], 10000, 5000000, searchQuery.value, currentPage.value);
  }
};
</script>

<template>
  <Navbar />

  <div class="mainContainer">
    <Sidebar />
    
    <div class="content">
      <Product />

      
      <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
        <span>Page {{ currentPage }} of {{ lastPage }}</span>
        <button @click="nextPage" :disabled="currentPage === lastPage">Next</button>
      </div>
    </div>
  </div>
</template>

<style scoped>

.mainContainer {
  display: flex;
  height: calc(100vh - 60px);
  width: 100%;
  background-color: salmon;
  
  margin-top: 60px;
}

.content {
  /* flex: 1; */
  padding: 20px;
  width: 80%;
  height: calc(100vh - 60px);
  background-color: aqua;
  overflow: auto;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

button {
  padding: 8px 12px;
  margin: 0 5px;
  background: #3498db;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}

button:disabled {
  background: #bdc3c7;
  cursor: not-allowed;
}
</style>
