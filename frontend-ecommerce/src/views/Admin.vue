<script setup>
  import { RouterView, RouterLink } from 'vue-router'
</script>

<template>
  <div class="admin-container">
    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="brand">Admin Panel</div>
      <nav class="nav">
        <RouterLink to="/admin/dashboard" class="nav-item">Dashboard</RouterLink>
        <RouterLink to="/admin/product" class="nav-item">Products</RouterLink>
        <RouterLink to="/admin/order" class="nav-item">Order</RouterLink>
        <RouterLink to="/admin/appearance" class="nav-item">Appearance</RouterLink>
        <RouterLink to="/admin/setting" class="nav-item">Settings</RouterLink>
        
      </nav>
    </aside>

    <!-- Main Content -->
    <main class="main-content">
      <header class="header">
        <h1>Dashboard</h1>
        <button class="btn-logout">Logout</button>
      </header>

      <RouterView></RouterView>
    </main>
  </div>
  
</template>

<style scoped>
.router-link-active {
  background-color: #475569; /* warna latar saat aktif */
  color: #fff; /* warna teks saat aktif */
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body, html {
  width: 100vw;
  height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f4f6f8;
  overflow-x: hidden;
}

.admin-container {
  display: flex;
  width: 100vw;
  height: 100vh;
}

/* Sidebar */
.sidebar {
  width: 250px;
  background-color: #1e293b;
  color: #fff;
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
}

.brand {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 40px;
}

.nav {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.nav-item {
  color: #cbd5e1;
  text-decoration: none;
  font-size: 16px;
  transition: color 0.3s, background 0.3s;
  padding: 10px;
  border-radius: 6px;
}

.nav-item:hover {
  background-color: #334155;
  color: #fff;
}

/* Main content */
.main-content {
  flex: 1;
  padding: 30px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.btn-logout {
  background-color: #ef4444;
  border: none;
  color: white;
  padding: 10px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.3s;
}










</style>
