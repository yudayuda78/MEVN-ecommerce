<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import millsLogo from '@/assets/mills.webp';

// State untuk jumlah item di cart
const cartCount = ref(0);
</script>

<template>
  <nav class="navbar">
    <!-- Logo Mills -->
    <RouterLink to="/" class="navbar__logo">
      <img :src="millsLogo" alt="Logo" />
    </RouterLink>

    <!-- Menu Navigasi -->
    <ul class="navbar__menu">
      <li><RouterLink to="/men" class="menu-item">Men</RouterLink></li>
      <li><RouterLink to="/women" class="menu-item">Women</RouterLink></li>
      <li><RouterLink to="/kids" class="menu-item">Kids</RouterLink></li>
      <li><RouterLink to="/other" class="menu-item">Other</RouterLink></li>
    </ul>

    <!-- Cart dengan counter -->
    <RouterLink to="/cart" class="navbar__cart">
        <i class="ri-shopping-cart-fill"></i>
      <span v-if="cartCount > 0" class="cart-badge">{{ cartCount }}</span>
    </RouterLink>

    <!-- Account Icon -->
    <RouterLink to="/account" class="navbar__account">
        <i class="ri-account-circle-fill"></i>
    </RouterLink>
  </nav>
</template>

<style scoped>
/* Navbar Styling */
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  background-color: black;
}

/* Logo Styling */
.navbar__logo {
  margin-left: 20px;
}

.navbar__logo img {
  width: 100px;
  height: auto;
  filter: invert(1) brightness(1000%);
}

/* Menu Styling */
.navbar__menu {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0 auto;
  justify-content: center;
  gap: 40px;
}

.navbar__menu li {
  text-align: center;
  flex: 1;
}

.navbar__menu li a {
  text-decoration: none;
  color: white;
  font-weight: bold;
  display: block;
  padding: 10px 20px;
}

.menu-item {
  display: flex;
  justify-content: center;
  width: auto;
}

/* Cart Styling */
.navbar__cart {
  position: relative;
  font-weight: bold;
  cursor: pointer;
  margin-right: 20px;
}

.navbar__cart i {
  font-size: 24px;
  color: white;
  text-decoration: none;
}

/* Cart Badge Styling */
.cart-badge {
  position: absolute;
  top: -5px;
  right: -10px;
  background: red;
  color: white;
  font-size: 12px;
  font-weight: bold;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Account Icon Styling */
.navbar__account {
  font-size: 24px;
  color: white;
  cursor: pointer;
  margin-right: 20px;
  text-decoration: none;
}

.navbar__account i {
  font-size: 24px;
  color: white;
}


</style>
