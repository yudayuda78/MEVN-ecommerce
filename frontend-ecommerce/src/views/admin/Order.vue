<script setup>
 import { useOrderStore } from '@/stores/orderStore';
import { onMounted } from 'vue';

 const orderStore = useOrderStore()

 onMounted(async () => {
    await orderStore.getInvoice()
    console.log(orderStore.orderData.data)
 })


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
      <tr v-for="(order, index) in orderStore.orderData.data" :key="index">
       
        <td>{{ order.userId }}</td>
        <td>{{ order.payerEmail }}</td>
        <td>{{ order.description }}</td>
        <td>{{ order.amount }}</td>
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