<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import axios from 'axios'
import millsLogo from '@/assets/mills.webp'

// State untuk jumlah item di cart
const cartCount = ref(1)
const router = useRouter()
const isLoggedIn = ref(false)
const isLoginModalOpen = ref(false)
const isRegisterModalOpen = ref(false)
const isDropdownOpen = ref(false)
const isDropdownOpenCart =ref(false)

const closeLoginModal = () => {
  isLoginModalOpen.value = false
}

const closeRegisterModal = () => {
  isRegisterModalOpen.value = false
  isLoginModalOpen.value = false
}

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

const toggleDropdownCart = () => {
  isDropdownOpenCart.value = !isDropdownOpenCart.value
}



const closeDropdown = (event) => {
  if (!event.target.closest('.navbar__account')) {
    isDropdownOpen.value = false
  }
}

onMounted(async () => {
        if (authStore.isLoggedIn) {
            await authStore.getUser();
        }
    });

onMounted(() => {
  document.addEventListener('click', closeDropdown)
})

// Hapus event listener saat komponen di-unmount
onUnmounted(() => {
  document.removeEventListener('click', closeDropdown)
})

const logout = () => {
  authStore.logoutUser()
  isDropdownOpen.value = false
  router.push('/')
}

const authStore = useAuthStore()
const registerData = ref({
  name: '',
  username: '',
  email: '',
  password: '',
  address: ''
})

const loginData = ref({
  email: '',
  password: ''
})

const handleRegister = async () => {
  const success = await authStore.registerUser(registerData.value)
  if (success) {
    closeRegisterModal()
    isLoginModalOpen.value = true 
  }
}

const handleLogin = async () => {
  const success = await authStore.loginUser(loginData.value)
  if (success) {
    closeLoginModal()
  }
}

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
      <li><RouterLink to="/kid" class="menu-item">Kid</RouterLink></li>
      <li><RouterLink to="/other" class="menu-item">Other</RouterLink></li>
    </ul>

    <!-- Cart dengan counter -->
     <div class="cart_menu">
      <button @click="toggleDropdownCart">
        <i class="ri-shopping-cart-fill"></i>
        <span v-if="cartCount > 0" class="cart-badge">{{ cartCount }}</span>
      </button>
      <div v-if="isDropdownOpenCart" class="dropdown-menu-cart">
        <div class="product">
          <p>No. 1</p>
          <div class="pict"></div>
          <p>Mills</p>
          <p>Jumlah: </p>
        </div>
        <RouterLink to="/cart" class="dropdown-item-cart">Check Out</RouterLink>
      </div>
      
     </div>
   

    <!-- Account Icon -->
    <div class="navbar__account" v-if="authStore.isLoggedIn">
      <button @click="toggleDropdown" class="account-btn">
        <i class="ri-account-circle-fill"></i>
      </button>
      <div v-if="isDropdownOpen" class="dropdown-menu">
        <h1>Hallo {{ authStore.user?.name }}</h1>
        <RouterLink to="/account" class="dropdown-item">Profile</RouterLink>
        <button @click="logout" class="dropdown-item logout-btn">Logout</button>
      </div>
    </div>
    <button v-else @click="isLoginModalOpen = true" class="navbar__login">
      Login
    </button>
  </nav>

  <!-- login form -->
  <div v-if="isLoginModalOpen" class="modal-overlay" @click.self="closeLoginModal">
    <div class="modal">
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <input type="text" placeholder="email" v-model="loginData.email" required />
        <input type="password" placeholder="Password" v-model="loginData.password" required />
        <button type="submit">Login</button>
      </form>
      <button class="close-btn" @click="closeLoginModal">X</button>
      <button class="register" @click="isRegisterModalOpen = true">Register</button>
    </div>
  </div>

  <!-- //register form -->
  <div v-if="isRegisterModalOpen" class="modal-overlay" @click.self="closeRegisterModal">
    <div class="modal">
      <h2>Login</h2>
      <form @submit.prevent="handleRegister">
        <input type="text" placeholder="Name" v-model="registerData.name" required />
        <input type="text" placeholder="Username" v-model="registerData.username" required />
        <input type="text" placeholder="Email" v-model="registerData.email" required />
        <input type="password" placeholder="Password"  v-model="registerData.password" required />
        <input type="text" placeholder="Address" v-model="registerData.address" required />
        <button type="submit">Register</button>
      </form>
      <button class="close-btn" @click="closeRegisterModal">X</button>
    </div>
  </div>

</template>

<style scoped>
/* Navbar Styling */
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  background-color: black;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
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
.cart_menu button {
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
}

.cart_menu button i{
  font-size: 24px;
  color: white;
  text-decoration: none;
}

.dropdown-menu-cart{
  position: absolute;
  top: 40px;
  right: 0;
  background: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  min-width: 150px;
  z-index: 10;
}

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
  right: 60px;
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

.navbar__login {
  margin-right: 20px;
}

.login-btn {
  background-color: white;
  color: black;
  border: none;
  padding: 8px 15px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  border-radius: 5px;
}


.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  width: 300px;
  position: relative;
}

.modal input {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.modal button {
  background-color: black;
  color: white;
  border: none;
  padding: 10px;
  width: 100%;
  border-radius: 5px;
  cursor: pointer;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: red;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}


.dropdown-menu {
  position: absolute;
  top: 40px;
  right: 0;
  background: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  min-width: 150px;
  z-index: 10;
}

.dropdown-item {
  display: block;
  padding: 10px;
  text-align: left;
  text-decoration: none;
  color: black;
  cursor: pointer;
  width: 100%;
  background: none;
  border: none;
}

.dropdown-menu h1{
  color: black;
}

.dropdown-item:hover {
  background: #f5f5f5;
}

.logout-btn {
  color: red;
}

</style>
