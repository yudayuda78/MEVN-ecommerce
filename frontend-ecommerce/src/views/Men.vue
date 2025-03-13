<script setup>
import { ref, onMounted, watch} from 'vue'
import Navbar from '../components/Navbar.vue'
import { useRoute } from 'vue-router';
import Sidebar from '../components/Sidebar.vue'
import { useProductStore } from '@/stores/productStore';
import Product from '../components/Product.vue';

const route = useRoute();
const productStore = useProductStore()
const jenis = ref('men')

onMounted(() => {
  productStore.fetchProducts(jenis.value);
})

watch(
  () => route.path,
  (newPath) => {
    let newJenis = '';

    if (newPath === '/men') newJenis = 'men';
    else if (newPath === '/women') newJenis = 'women';
    else if (newPath === '/kid') newJenis = 'kid';
    else if (newPath === '/other') newJenis = 'other';

   
    
    // Pastikan newJenis tetap string sebelum diassign
    if (typeof newJenis !== 'string') {
      console.log("⚠️ WARNING: newJenis bukan string!", newJenis);
      newJenis = 'men'; // Default
    }

    jenis.value = newJenis;
    

    productStore.fetchProducts(jenis.value);
  },
  { immediate: true }
);







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
