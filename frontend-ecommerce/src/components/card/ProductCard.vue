<script setup>
import { RouterLink } from 'vue-router'
import { useCartStore } from '@/stores/cartStore'

const cartStore = useCartStore()

const buttonAddCart = (productId) => {
  cartStore.addToCart(productId)
}

defineProps({
  product: Object,
})
</script>

<template>
  <div class="card">
    <RouterLink :to="`/product/${product._id}`">
      <img :src="`http://localhost:9887/${product.image}`" alt="Gambar" class="card-image" />
      <div class="card-body">
        <h3 class="card-title">{{ product.nama_product }}</h3>
        <p class="card-price">Rp{{ product.harga }}</p>
        <p class="card-quantity">Stok: {{ product.jumlah }}</p>
      </div>
    </RouterLink>
    <div class="buttonCard">
      <RouterLink :to="`/product/${product._id}`">
        <button class="btn btn-buy">Buy</button>
      </RouterLink>
      
      <button class="btn btn-cart" @click="buttonAddCart(product._id)">Add to Cart</button>
    </div>
  </div>
</template>

<style scoped>
.card {
  border: 1px solid #e0e0e0;
  border-radius: 1rem;
  padding: 1rem;
  max-width: 100%;
  width: 100%;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  background-color: #fff;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease;
}
.card:hover {
  transform: translateY(-4px);
}

.card-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 1rem;
}

.card-body {
  margin-top: 1rem;
  text-align: left;
}

.card-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.3rem;
  color: #333;
}

.card-price {
  font-size: 1rem;
  color: #2ecc71;
  font-weight: bold;
}

.card-quantity {
  font-size: 0.9rem;
  color: #777;
}

.buttonCard {
  margin-top: 1rem;
  display: flex;
  gap: 0.5rem;
}

.btn {
  flex: 1;
  padding: 0.6rem 1rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-buy {
  background-color: #3498db;
  color: white;
}
.btn-buy:hover {
  background-color: #2980b9;
}

.btn-cart {
  background-color: #f1c40f;
  color: white;
}
.btn-cart:hover {
  background-color: #d4ac0d;
}

@media (max-width: 500px) {
  .card-image {
    height: 150px;
  }
}
</style>
