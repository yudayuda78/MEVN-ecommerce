<script setup>
import { onMounted, ref, computed } from 'vue'

import { useOrderStore } from '@/stores/orderStore'
const orderStore = useOrderStore()

onMounted( async() =>{
    await orderStore.getOrderById()
    
})


const order = computed(() => orderStore.orderData.data || {})


const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<template>

    
  <div class="order-container">
    <h2>Detail Pesanan</h2>
    
    <div class="order-meta">
      <p><strong>Status:</strong> {{ order.status }}</p>
      <p><strong>Nama:</strong> {{ order.user_id?.name }}</p>
      <p><strong>Alamat:</strong> {{ order.status }}</p>
      <p><strong>Metode Pembayaran:</strong> {{ order.payment_method }}</p>
      <p><strong>Waktu Pemesanan:</strong> {{ formatDate(order.created_at) }}</p>
      <p>
        <strong>Invoice:</strong>
        <a :href="order.invoice_url" target="_blank">Lihat Invoice</a>
      </p>
    </div>

    <div class="items-section">
      <h3>Item Dipesan:</h3>
      <ul>
        <li v-for="(item, index) in order.items" :key="index">
          <p><strong>Produk ID:</strong> {{ item.product_id.$oid }}</p>
          <p><strong>Kuantitas:</strong> {{ item.quantity }}</p>
          <p><strong>Harga:</strong> Rp {{ item.price.toLocaleString() }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>



<style scoped>
.order-container {
  max-width: 700px;
  margin: 30px auto;
  padding: 20px;
  background: #fefefe;
  border: 1px solid #ddd;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  font-family: "Segoe UI", sans-serif;
}

.order-meta p, .items-section p {
  margin: 5px 0;
}

.items-section ul {
  list-style: none;
  padding: 0;
}

.items-section li {
  padding: 15px;
  margin-bottom: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: #fafafa;
}
</style>
