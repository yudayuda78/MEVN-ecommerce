<template>
    <div class="card">
      <img  class="card-image" />
      <div class="card-body">
        <h3 class="card-title"></h3>
        <p class="card-price"></p>
        <p class="card-quantity"></p>
      </div>
    </div>

    
  </template>
  
  <script>
//   export default {
//     props: {
//       nama_product: String,
//       harga: Number,
//       image: String,
//       jumlah: Number,
//     },
//   };
  </script>
  
  <style scoped>
  .card {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 16px;
    width: 250px; /* Tetapkan lebar tetap */
    text-align: center;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
    background: white;
  }
  
  .card-image {
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: 8px;
  }
  
  .card-body {
    margin-top: 10px;
  }
  
  .card-title {
    font-size: 18px;
    font-weight: bold;
  }
  
  .card-price {
    font-size: 16px;
    color: #27ae60;
    font-weight: bold;
  }
  
  .card-quantity {
    font-size: 14px;
    color: #555;
  }
  </style>
  