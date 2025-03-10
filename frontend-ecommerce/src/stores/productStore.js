import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

export const useProductStore = defineStore('product', () => {
  const productData = ref([]);

  
  const fetchProducts = async (selectedCategories = []) => {
    try {
      let query = selectedCategories.length
        ? `?kategori=${selectedCategories.join(",")}`
        : ""
      
      const response = await axios.get(`http://localhost:9887/api/product${query}`);
      productData.value = response.data;
    } catch (error) {
      console.error('Gagal mengambil data produk:', error);
    }
  };

  const detailProduct = async () => {
    try{
      const detailProduct = await axios.get('http://localhost:9887/api/product/')
    }catch(error){

    }
  }


  return {
    productData,
    fetchProducts,
  };
});
