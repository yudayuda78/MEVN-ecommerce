<script setup>
import { onMounted, ref, computed, watch } from "vue";
import Button from "../components/button/Button.vue";
import { useCartStore } from "@/stores/cartStore";
import { useAuthStore } from "@/stores/authStore";
import axios from "axios";

const cartStore = useCartStore();
const authStore = useAuthStore();

const email = computed(() => authStore.user.email || "");
const nama = computed(() => authStore.user.name);

onMounted(async () => {
  await cartStore.getProductByUser();
  await authStore.getUser();
});

const totalHargaPerItem = (item) => {
  const harga = item.product_id?.harga || 0;
  const quantity = item.quantity || 0;
  return harga * quantity;
};

const hargaDibayarkan = computed(() => {
  if (!cartStore.cartItems.length) return 0;
  return cartStore.cartItems[0].items.reduce((total, item) => {
    return total + totalHargaPerItem(item);
  }, 0);
});

const increaseQuantity = async (productID) => {
  await cartStore.addToCart(productID);
};

const decreaseQuantity = async (productID) => {
  await cartStore.decrease(productID);
};

const totalCost = ref;

const checkout = async () => {
  if (!cartStore.cartItems.length) return console.log("cart kosong");

  const itemsForInvoice = cartStore.cartItems[0].items.map((item) => ({
    product_id: item.product_id?._id,
    name: item.product_id?.nama_product,
    price: item.product_id?.harga,
    quantity: item.quantity,
  }));

  const itemsForOrder = cartStore.cartItems[0].items.map((item) => ({
    product_id: item.product_id?._id,
    quantity: item.quantity,
    price: item.product_id?.harga,
  }));

  const name = authStore.user.name;
  const email = authStore.user.email;

  try {
    // 1. Simpan Order ke DB
    const orderRes = await axios.post("http://localhost:9887/api/order/createOrder",{
        items: itemsForOrder,
        payment_method: "Xendit", // bisa ditambahkan pilihan jika multi pembayaran
      },
      {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      }
    );

    // 2. Buat Invoice di Xendit
    const invoiceRes = await axios.post("http://localhost:9887/api/payment/v2/invoices",{
        name,
        email,
        items: itemsForInvoice,
      }
    );

    const invoiceUrl = invoiceRes.data.invoice_url;
    window.location.href = invoiceUrl;
  } catch (error) {
    console.error("Error saat checkout:", error);
    if (error.response) {
      console.log("Response:", error.response.data);
    }
  }
};
</script>

<template>
  <div class="cart-container">
    <div v-if="cartStore.cartItems.length > 0">
      <div
        v-for="(item, index) in cartStore.cartItems[0].items"
        :key="item._id"
        class="cart-card"
      >
        <p class="cart-number">No. {{ index + 1 }}</p>

        <div class="cart-content">
          <div class="cart-image">
            <img
              :src="`http://localhost:9887/${item.product_id.image}`"
              alt="Gambar"
              class="cart-image"
            />
          </div>
          <div class="cart-info">
            <p class="product-name">{{ item.product_id?.nama_product }}</p>
            <p class="product-price">{{ item.product_id?.harga }}</p>
            <p class="product-totalPrice">
              Total: Rp{{ totalHargaPerItem(item).toLocaleString() }}
            </p>

            <div class="quantity-control">
              <Button
                class="qty-button"
                @click="decreaseQuantity(item.product_id._id)"
                >-</Button
              >
              <span class="qty-text">Jumlah: {{ item.quantity }}</span>
              <Button
                class="qty-button"
                @click="increaseQuantity(item.product_id._id)"
                >+</Button
              >
            </div>
          </div>
        </div>
      </div>

      <div class="checkout-wrapper">
        <p>Total Bayar: Rp{{ hargaDibayarkan.toLocaleString() }}</p>
        <Button @click="checkout" class="checkout-button">Checkout</Button>
      </div>
    </div>

    <div v-else class="empty-cart">
      <p>Keranjang kosong</p>
    </div>
  </div>
</template>

<style scoped>
.cart-container {
  padding: 24px;
  max-width: 800px;
  margin: 50px auto 0 auto;
}

.cart-card {
  background: #f9f9f9;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}

.cart-number {
  font-weight: bold;
  margin-bottom: 8px;
}

.cart-content {
  display: flex;
  gap: 16px;
  align-items: center;
}

.cart-image {
  width: 120px;
  height: 120px;
  background-color: #ddd;
  border-radius: 8px;
}

.cart-info {
  flex: 1;
}

.product-name {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 12px;
}

.quantity-control {
  display: flex;
  align-items: center;
  gap: 12px;
}

.qty-button {
  padding: 6px 12px;
  font-size: 16px;
}

.qty-text {
  font-size: 14px;
}

.checkout-wrapper {
  display: flex;
  justify-content: flex-end;
  margin-top: 32px;
}

.checkout-button {
  padding: 12px 28px;
  font-size: 16px;
  background-color: #0d6efd;
  color: white;
  border-radius: 6px;
}

.empty-cart {
  text-align: center;
  padding: 40px;
  font-size: 18px;
  color: #666;
}
</style>
