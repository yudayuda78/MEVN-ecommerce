<template>
  <div class="container">
    <SearchProduct />
    <div class="cardContainer">
        <ProductCard 
        v-for="product in productStore.productData" 
        :key="product._id"
        :product="product"
         />
    </div>
  </div>
</template>
<script setup>
    import { ref, onMounted } from 'vue'
    import ProductCard from "./card/ProductCard.vue";
    import SearchProduct from "./search/SearchProduct.vue";
    import { useProductStore } from "@/stores/productStore";
    const productStore = useProductStore();
    onMounted(() => {
        productStore.fetchProducts();
    })

    
</script>

<style scoped>


.cardContainer {
  width: 100%;
  /* background-color: aqua; */
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(250px, 1fr)
  );
  gap: 20px;
  padding: 20px;
  justify-content: center;
}
</style>
