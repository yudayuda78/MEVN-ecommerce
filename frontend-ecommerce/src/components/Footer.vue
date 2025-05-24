<template>
    <footer class="footer">
      <div class="footer-container">
        <!-- Brand & Deskripsi -->
        <div class="footer-section">
          <h2 class="footer-logo">ShopKita</h2>
          <p class="footer-text">
            Temukan produk terbaik dengan harga terjangkau hanya di ShopKita. Kepuasan Anda prioritas kami.
          </p>
        </div>
  
        <!-- Navigasi -->
        <div class="footer-section">
          <h3 class="footer-title">Tautan Cepat</h3>
          <ul class="footer-links">
            <li><a href="/">Beranda</a></li>
            <li><a href="/produk">Produk</a></li>
            <li><a href="/keranjang">Keranjang</a></li>
            <li><a href="/kontak">Kontak</a></li>
          </ul>
        </div>
  
        <!-- Bantuan -->
        <div class="footer-section">
          <h3 class="footer-title">Bantuan</h3>
          <ul class="footer-links">
            <li><a href="/faq">FAQ</a></li>
            <li><a href="/pengiriman">Pengiriman</a></li>
            <li><a href="/pembayaran">Pembayaran</a></li>
            <li><a href="/kebijakan">Kebijakan Pengembalian</a></li>
          </ul>
        </div>
  
        <!-- Kontak -->
        <div class="footer-section">
          <h3 class="footer-title">Hubungi Kami</h3>
          <p>Email: support@shopkita.com</p>
          <p>Telp: +62 812-3456-7890</p>
          <div class="social-icons">
            <a href="#"><span>🌐</span></a>
            <a href="#"><span>📘</span></a>
            <a href="#"><span>📸</span></a>
          </div>
        </div>
      </div>
  
      <div class="footer-bottom">
        © {{ new Date().getFullYear() }} ShopKita. All rights reserved.
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: "Footer",
  };
  </script>
  
  <style scoped>
  .footer {
    background-color: #1f1f1f;
    color: #fff;
    padding: 40px 20px;
    font-family: sans-serif;
  }
  
  .footer-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    max-width: 1200px;
    margin: auto;
    gap: 30px;
  }
  
  .footer-section {
    flex: 1 1 220px;
  }
  
  .footer-logo {
    font-size: 22px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  .footer-text {
    font-size: 14px;
    line-height: 1.6;
    color: #ccc;
  }
  
  .footer-title {
    font-size: 16px;
    margin-bottom: 10px;
    font-weight: bold;
  }
  
  .footer-links {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .footer-links li {
    margin-bottom: 6px;
  }
  
  .footer-links a {
    color: #bbb;
    text-decoration: none;
  }
  
  .footer-links a:hover {
    color: #fff;
  }
  
  .social-icons a {
    margin-right: 10px;
    font-size: 20px;
    color: #bbb;
    text-decoration: none;
  }
  
  .social-icons a:hover {
    color: #fff;
  }
  
  .footer-bottom {
    margin-top: 30px;
    text-align: center;
    font-size: 13px;
    color: #999;
  }
  </style>
  