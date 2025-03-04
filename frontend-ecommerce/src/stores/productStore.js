import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

export const useProductStore = defineStore('product', () => {
  const productData = ref([]);

  // Fungsi untuk mengambil data produk dari API
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:9887/api/product');
      productData.value = response.data; // Menyimpan data produk ke dalam productData
    } catch (error) {
      console.error('Gagal mengambil data produk:', error);
    }
  };

  // Kembalikan data dan fungsi agar bisa diakses di komponen
  return {
    productData,
    fetchProducts,
  };
});
