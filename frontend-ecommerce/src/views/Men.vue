<script setup>
import { ref, onMounted, watch} from 'vue'
import Navbar from '../components/Navbar.vue'
import { useRoute } from 'vue-router';
import Sidebar from '../components/Sidebar.vue'
import { useProductStore } from '@/stores/productStore';
import Product from '../components/Product.vue';
import { storeToRefs } from 'pinia'

const route = useRoute();
const productStore = useProductStore()
const { searchQuery } = storeToRefs(productStore)
const jenis = ref('men')

onMounted(() => {
  productStore.fetchProducts(jenis.value);
})





  


watch(searchQuery, () => {
  productStore.fetchProducts(jenis.value, [], [], 10000, 5000000, searchQuery.value);
});





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
