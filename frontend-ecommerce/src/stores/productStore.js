import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

export const useProductStore = defineStore('product', () => {
  const productData = ref([]);
  const searchQuery = ref("");
  const currentPage = ref(1); // Simpan halaman aktif
  const lastPage = ref(1);
  
  const fetchProducts = async (jenis = '', selectedCategories = [], selectedColor = [], minPrice = 10000, maxPrice = 5000000, search = searchQuery.value, page = 1) => {
    try {
      if (Array.isArray(jenis)) {
        jenis = jenis[0] || ''; // Ambil elemen pertama jika jenis adalah array
      }

      let queryParams = [];
      
      if (jenis) queryParams.push(`jenis=${encodeURIComponent(jenis)}`);
      if (selectedCategories.length) {
        queryParams.push(`kategori=${selectedCategories.join(",")}`);
      }
      if (selectedColor.length) {
        queryParams.push(`color=${selectedColor.join(",")}`);
      }
      if (search) queryParams.push(`search=${encodeURIComponent(search)}`);

      queryParams.push(`minPrice=${minPrice || 10000}`);
      queryParams.push(`maxPrice=${maxPrice || 5000000}`);
      queryParams.push(`page=${page}`); // Menggunakan parameter page yang dikirim
      queryParams.push(`limit=12`);

      const queryString = queryParams.length ? `?${queryParams.join("&")}` : "";
      
      console.log("🔍 Fetching data from:", `http://localhost:9887/api/product${queryString}`);
      const response = await axios.get(`http://localhost:9887/api/product${queryString}`);

      productData.value = response.data.data;
      currentPage.value = response.data.current_page;
      lastPage.value = response.data.last_page;
    } catch (error) {
      console.error('Gagal mengambil data produk:', error);
    }
  };

  const detailProduct = async (id) => {
    try {
      const response = await axios.get(`http://localhost:9887/api/product/${id}`);
      return response.data; 
    } catch (error) {
      console.error("Gagal mengambil detail produk:", error);
      return null;
    }
  };

  return {
    productData,
    fetchProducts,
    searchQuery,
    currentPage,
    lastPage,
    detailProduct,
  };
});
