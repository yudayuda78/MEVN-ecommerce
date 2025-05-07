<script setup>
</script>

<template>
    <section class="dashboard">
        <div class="card">
          <h3>Total Users</h3>
          <p>1,250</p>
        </div>
        <div class="card">
          <h3>Products</h3>
          <p>312</p>
        </div>
        <div class="card">
          <h3>Visits</h3>
          <p>8,451</p>
        </div>
      </section>
</template>

<style scoped>
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

.btn-logout:hover {
  background-color: #dc2626;
}

.dashboard {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.card {
  background-color: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.05);
  flex: 1 1 250px;
  min-width: 220px;
}

.card h3 {
  font-size: 18px;
  margin-bottom: 10px;
  color: #334155;
}

.card p {
  font-size: 24px;
  font-weight: bold;
  color: #0f172a;
}
</style>