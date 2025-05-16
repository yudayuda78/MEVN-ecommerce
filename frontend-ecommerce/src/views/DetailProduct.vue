<script setup>
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useProductStore } from '@/stores/productStore';
import { storeToRefs } from 'pinia';

const route = useRoute();
const router = useRouter();
const productStore = useProductStore();
const { detailProductData } = storeToRefs(productStore);

onMounted(async () => {
  await productStore.detailProduct(route.params.id);
});

const goBack = () => {
  router.back();
};
</script>

<template>
  <div v-if="detailProductData" class="detail-container">
    <button @click="goBack" class="back-button">← Kembali</button>
    <div class="detail-card">
      <img :src="`http://localhost:9887/${detailProductData.image}`" alt="Produk" class="product-image" />
      <div class="detail-info">
        <h2 class="product-title">{{ detailProductData.nama_product }}</h2>
        <p class="price">Rp {{ detailProductData.harga.toLocaleString() }}</p>
        <p class="description">{{ detailProductData.deskripsi }}</p>
      </div>
    </div>
  </div>
  <div v-else class="loading">Memuat detail produk...</div>
</template>


<style scoped>
.detail-container {
  padding: 2rem;
  max-width: 1000px;
  margin: 0 auto;
  animation: fadeIn 0.4s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.back-button {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  cursor: pointer;
  border-radius: 8px;
  font-size: 1rem;
  transition: background-color 0.3s ease;
  margin-bottom: 1rem;
}
.back-button:hover {
  background-color: #2980b9;
}

.detail-card {
  display: flex;
  gap: 2rem;
  background: #fff;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
  flex-wrap: wrap;
}

.product-image {
  width: 300px;
  max-width: 100%;
  border-radius: 1rem;
  object-fit: cover;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.detail-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.product-title {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #2c3e50;
}

.price {
  font-size: 1.5rem;
  font-weight: bold;
  color: #e74c3c;
  margin-bottom: 1rem;
}

.description {
  font-size: 1rem;
  color: #555;
  line-height: 1.6;
}

.loading {
  text-align: center;
  font-size: 1.2rem;
  padding: 2rem;
  color: #888;
}
</style>
