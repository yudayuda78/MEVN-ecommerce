import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

export const useProductStore = defineStore('product', () => {
  const productData = ref([]);

  
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:9887/api/product');
      productData.value = response.data; // Menyimpan data produk ke dalam productData
    } catch (error) {
      console.error('Gagal mengambil data produk:', error);
    }
  };

  


  return {
    productData,
    fetchProducts,
  };
});
