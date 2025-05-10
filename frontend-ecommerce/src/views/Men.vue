<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import Sidebar from '../components/Sidebar.vue';
import { useProductStore } from '@/stores/productStore';
import Product from '../components/Product.vue';
import { storeToRefs } from 'pinia';
import Navbar from '../components/Navbar.vue'


const route = useRoute();
const productStore = useProductStore();
const { searchQuery, currentPage, lastPage } = storeToRefs(productStore);
const jenis = ref('men');

onMounted(() => {
  productStore.fetchProducts(jenis.value, [], [], 10000, 5000000, searchQuery.value, currentPage.value);
});

// Watch perubahan pencarian
watch(searchQuery, () => {
  productStore.fetchProducts(jenis.value, [], [], 10000, 5000000, searchQuery.value, currentPage.value);
});

// Function untuk next dan prev page
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
  <Navbar></Navbar>

  <div class="mainContainer">
    <Sidebar />
    <div class="content">
      <Product />

      <!-- Pagination Controls -->
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
  
}

.content {
  flex: 1;
  padding: 20px;
  margin-top: 100px;
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
