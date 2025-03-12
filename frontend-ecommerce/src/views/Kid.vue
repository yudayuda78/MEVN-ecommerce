<script setup>
import { ref, onMounted } from 'vue'
import Navbar from '../components/Navbar.vue'
import Sidebar from '../components/Sidebar.vue'
import { useProductStore } from '@/stores/productStore';
import Product from '../components/Product.vue';

const productStore = useProductStore()




onMounted(() => {
  productStore.fetchProducts();
})


</script>

<template>
  <div class="mainContainer">
    <Sidebar :DataList="DataList" />
    <Product />
  </div>
  <!-- <p>Data Product:</p>
      <ul>
        
        <li v-for="(product, index) in productStore.productData" :key="product._id">
          <strong>{{ product.nama_product }}</strong><br>
          Merk: {{ product.merk }}<br>
          Warna: {{ product.warna }}<br>
          Jumlah: {{ product.jumlah }}<br>
        </li>
      </ul> -->
</template>

<style scoped>
.mainContainer{
  display: flex;
}
</style>
