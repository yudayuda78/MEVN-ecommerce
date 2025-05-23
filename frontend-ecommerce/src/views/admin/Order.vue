<script setup>
 import { useOrderStore } from '@/stores/orderStore';
import { onMounted, onUnmounted } from 'vue';

 const orderStore = useOrderStore()

 onMounted(async () => {
  await orderStore.getInvoice();

  // Refresh data setiap 5 detik (5000 ms)
  intervalId = setInterval(async () => {
    await orderStore.getInvoice();
  }, 5000);
});

// Hentikan polling saat komponen tidak digunakan
onUnmounted(() => {
  clearInterval(intervalId);
});


</script>

<template>
    <table class="order-table">
    <thead>
      <tr>
        <th>Id</th>
        <th>Email</th>
        <th>Description</th>
        <th>Jumlah</th>
        <th>Status</th>
        
      </tr>
    </thead>
    <tbody>
      <tr v-for="(order, index) in orderStore.orderData" :key="index">
       
        <td>{{ order.user_id }}</td>
        <td>{{ order.external_id }}</td>
        <td>{{ order.invoice_url}}</td>
        <td>{{ order.total_price }}</td>
        <td>{{ order.status }}</td>
       
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
.order-table th,
.order-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.order-table th {
  background-color: #f2f2f2;
}
</style>