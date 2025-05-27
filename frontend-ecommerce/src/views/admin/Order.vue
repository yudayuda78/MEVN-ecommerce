<script setup>
import Button from '@/components/button/Button.vue';
import { useOrderStore } from '@/stores/orderStore';
import { onMounted, onUnmounted, ref } from 'vue';

const orderStore = useOrderStore();
const expandedIndex = ref(null);
const showModal = ref(false)
const selectedOrder = ref(null);





const modalUpdate = (order) => {
  selectedOrder.value = order
  showModal.value = !showModal.value
};

const update = (orderID) => {
  
}

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
  <div v-if="showModal" class="modal-wrapper">
    <div class="overlay" @click="showModal = false">
      <div class="modal-box modal-update-order" @click.stop>
        <p><strong>ID Order:</strong> {{ selectedOrder?._id }}</p>
        <div class="input">
          <label for="status">Status:</label>
          <select name="status" id="status">
            <option value="">Processing</option>
            <option value="">Shipped</option>
            <option value="">Cancelled</option>
            <option value="">Refund</option>
          </select>
        </div>

        <div class="input">
          <label for="resi">Nomor Resi:</label>
          <input type="text" id="resi"/>
        </div>


        <Button >Update</Button>
      </div>
    </div>
  </div>



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
                    <li><strong>Handphone:</strong> {{ order.user_id.handphone }}</li>

            
                    <li v-for="(item, i) in order.items" :key="i">
                      <strong>Produk:</strong> {{ item.product_id?.nama_product || item.product_id }} |
                      <strong>Jumlah:</strong> {{ item.quantity }} |
                      <strong>Harga:</strong> Rp{{ item.price.toLocaleString('id-ID') }}
                    </li>
                    <Button @click="modalUpdate(order)">Edit</Button>
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
.modal-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Gelap transparan */
  z-index: 1;
}
.modal-box {
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  width: 400px;
  /* max-width: 400px; */
  margin: 40px auto;
  padding: 24px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  font-family: sans-serif;
}



.input {
  margin-bottom: 16px;
}

.input label {
  display: block;
  font-weight: bold;
  margin-bottom: 6px;
  font-size: 14px;
  color: #333;
}

.input select {
  display: block;
  font-weight: bold;
  margin-bottom: 6px;
  font-size: 14px;
  color: #333;
}

.input input {
  width: 100%;
  padding: 10px 12px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
  box-sizing: border-box;
  transition: border-color 0.3s;
}

.input input:focus {
  border-color: #007bff;
  outline: none;
}





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
