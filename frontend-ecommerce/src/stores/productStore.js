import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

export const useProductStore = defineStore('product', () => {
  const productData = ref([]);

  
  const fetchProducts = async (jenis = '', selectedCategories = [], selectedColor = [], minPrice = 10000, maxPrice = 5000000, ) => {
    try {
      if (Array.isArray(jenis)) {
        jenis = jenis[0] || ''; // Ambil elemen pertama jika jenis adalah array
      }

      
      let queryParams = [];
      
    
      if (jenis) queryParams.push(`jenis=${jenis}`)
      if (selectedCategories.length) {
        queryParams.push(`kategori=${selectedCategories.join(",")}`)
      }

      if(selectedColor.length){
        queryParams.push(`color=${selectedColor.join(",")}`)
      }

      

      queryParams.push(`minPrice=${minPrice || 10000}`);
      queryParams.push(`maxPrice=${maxPrice || 5000000}`);

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
