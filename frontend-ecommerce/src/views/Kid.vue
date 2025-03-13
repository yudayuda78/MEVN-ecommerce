<script setup>
import { ref, onMounted, watch} from 'vue'
import Navbar from '../components/Navbar.vue'
import { useRoute } from 'vue-router';
import Sidebar from '../components/Sidebar.vue'
import { useProductStore } from '@/stores/productStore';
import Product from '../components/Product.vue';

const route = useRoute();
const productStore = useProductStore()
const jenis = ref('kid')

onMounted(() => {
  productStore.fetchProducts();
})

watch(() => route.path, (newPath) => {
  if (newPath === '/men') jenis.value = 'men';
  else if (newPath === '/women') jenis.value = 'women';
  else if (newPath === '/kid') jenis.value = 'kid';
  else if (newPath === '/other') jenis.value = 'other'

  productStore.fetchProducts(jenis.value);
});

console.log(jenis.value)




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
