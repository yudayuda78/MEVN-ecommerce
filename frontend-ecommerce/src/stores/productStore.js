import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

export const useProductStore = defineStore('product', () => {
  const productData = ref([]);

  
  const fetchProducts = async (selectedCategories = [], minPrice = 10000, maxPrice = 100000000) => {
    try {
      let queryParams = [];

      if (selectedCategories.length) {
        queryParams.push(`kategori=${selectedCategories.join(",")}`);
      }

      queryParams.push(`minPrice=${minPrice || 10000}`);
      queryParams.push(`maxPrice=${maxPrice || 100000000}`);

      const queryString = queryParams.length ? `?${queryParams.join("&")}` : "";

      const response = await axios.get(`http://localhost:9887/api/product${queryString}`);
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
