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

// Kembali ke halaman sebelumnya
const goBack = () => {
  router.back();
};
</script>

<template>
  <div v-if="detailProductData" class="detail-container">
    <button @click="goBack" class="back-button">← Kembali</button>
    <div class="detail-card">
      <img :src="detailProductData.image" alt="Produk" class="product-image" />
      <div class="detail-info">
        <h2>{{ detailProductData.nama_product }}</h2>
        <p class="price">Rp {{ detailProductData.harga.toLocaleString() }}</p>
        <p>{{ detailProductData.deskripsi }}</p>
      </div>
    </div>
  </div>
  <div v-else class="loading">Memuat detail produk...</div>
</template>

<style scoped>
.detail-container {
  padding: 20px;
}

.back-button {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  margin-bottom: 10px;
}

.detail-card {
  display: flex;
  gap: 20px;
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
}

.product-image {
  width: 300px;
  border-radius: 10px;
}

.detail-info {
  flex: 1;
}

.price {
  font-size: 1.5rem;
  font-weight: bold;
  color: #e74c3c;
}
</style>
