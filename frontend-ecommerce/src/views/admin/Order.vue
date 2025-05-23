<script setup>
import Button from '@/components/button/Button.vue';
import { useOrderStore } from '@/stores/orderStore';
import { onMounted, onUnmounted, ref } from 'vue';

const orderStore = useOrderStore();
const expandedIndex = ref(null);

let intervalId;

onMounted(async () => {
  await orderStore.getInvoice();
  intervalId = setInterval(async () => {
    await orderStore.getInvoice();
  }, 5000);
});

onUnmounted(() => {
  clearInterval(intervalId);
});

const toggleDetails = (index) => {
  expandedIndex.value = expandedIndex.value === index ? null : index;
};
</script>

<template>
  <div class="table-container">
    <table class="order-table">
      <thead>
        <tr>
          <th>Id</th>
          <th>Email</th>
          <th>Description</th>
          <th>Jumlah</th>
          <th>Status</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(order, index) in orderStore.orderData" :key="index">
          <tr class="main-row">
            <td>{{ order.user_id._id }}</td>
            <td>{{ order.user_id.email }}</td>
            <td>
              <a :href="order.invoice_url" target="_blank" class="link">
                Lihat Invoice
              </a>
            </td>
            <td>Rp{{ order.total_price.toLocaleString('id-ID') }}</td>
            <td>
              <span :class="['status', order.status]">{{ order.status }}</span>
            </td>
            <td>
              <Button class="btn" @click="toggleDetails(index)">
                {{ expandedIndex === index ? 'Sembunyikan' : 'Detail' }}
              </Button>
            </td>
          </tr>

          <!-- Transisi dropdown -->
          <tr>
            <transition name="fade">
              <td colspan="6" v-if="expandedIndex === index" class="dropdown-cell">
                <div class="dropdown-box">
                  <h4>Detail Produk</h4>
                  <ul>
                    <li><strong>Nama:</strong> {{ order.user_id.name}}</li>
                    <li><strong>Alamat:</strong> {{ order.user_id.address }}</li>
                    <li><strong>Email:</strong> {{ order.user_id.email }}</li>

            
                    <li v-for="(item, i) in order.items" :key="i">
                      <strong>Produk:</strong> {{ item.product_id?.nama_product || item.product_id }} |
                      <strong>Jumlah:</strong> {{ item.quantity }} |
                      <strong>Harga:</strong> Rp{{ item.price.toLocaleString('id-ID') }}
                    </li>
                  </ul>
                </div>
              </td>
            </transition>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.table-container {
  overflow-x: auto;
  padding: 1rem;
  font-family: 'Segoe UI', sans-serif;
}

.order-table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #e0e0e0;
  background-color: white;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.05);
  border-radius: 6px;
}

.order-table th,
.order-table td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #f0f0f0;
}

.order-table th {
  background-color: #fafafa;
  font-weight: 600;
  color: #333;
}

.link {
  color: #1e88e5;
  text-decoration: none;
}
.link:hover {
  text-decoration: underline;
}

.status {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.85rem;
  text-transform: capitalize;
}
.status.pending {
  background-color: #fff3cd;
  color: #856404;
}
.status.completed {
  background-color: #d4edda;
  color: #155724;
}
.status.failed {
  background-color: #f8d7da;
  color: #721c24;
}

.btn {
  padding: 6px 12px;
  width: 100px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
}
.btn:hover {
  background-color: #388e3c;
}

.dropdown-cell {
  background-color: #fafafa;
  padding: 0;
}

.dropdown-box {
  padding: 16px;
  animation: slideIn 0.3s ease;
}

.dropdown-box h4 {
  margin-bottom: 8px;
  font-size: 1rem;
  font-weight: 600;
}

.dropdown-box ul {
  padding-left: 16px;
  list-style: disc;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
