<script setup>
import { ref, onMounted, watch} from 'vue'
import Navbar from '../components/Navbar.vue'
import { useRoute } from 'vue-router';
import Sidebar from '../components/Sidebar.vue'
import { useProductStore } from '@/stores/productStore';
import Product from '../components/Product.vue';

const route = useRoute();
const productStore = useProductStore()
const jenis = ref('women')

onMounted(() => {
  productStore.fetchProducts(jenis.value);
})






</script>

<template>
  <div class="mainContainer">
    <Sidebar  />
    <Product />
  </div>
 
</template>

<style scoped>
.mainContainer{
  display: flex;
}
</style>
