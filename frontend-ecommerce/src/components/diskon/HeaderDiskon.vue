<template>
    <div class="slider-container">
      <div 
        class="slider"
        :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
      >
        <div v-for="(slide, index) in slides" :key="index" class="slide">
          {{ slide }}
        </div>
      </div>
      
      <!-- Navigation dots -->
      <div class="dots">
        <button 
          v-for="(slide, index) in slides" 
          :key="index" 
          @click="goToSlide(index)"
          :class="{ active: currentIndex === index }"
        ></button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        slides: [
          'Diskon 50% untuk semua produk sepakbola',
          'Diskon 70% spesial hari raya',
          'Cashback 20% untuk semua produk'
        ],
        currentIndex: 0
      };
    },
    mounted() {
      this.startAutoSlide();
    },
    methods: {
      startAutoSlide() {
        setInterval(() => {
          this.nextSlide();
        }, 3000); // Ubah slide setiap 3 detik
      },
      nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.slides.length;
      },
      goToSlide(index) {
        this.currentIndex = index;
      }
    }
  };
  </script>
  
  <style scoped>
  .slider-container {
    position: relative;
    width: 100%;
    max-width: 100%;
    overflow: hidden;
    /* border-radius: 10px; */
    margin: auto;
  }
  
  .slider {
    display: flex;
    transition: transform 0.5s ease-in-out;
  }
  
  .slide {
    min-width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #c8c8c8;
    color: rgb(52, 52, 52);
    font-size: 20px;
    font-weight: bold;
  }
  
  .dots {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    display: none;
    gap: 5px;
  }
  
  .dots button {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: gray;
    border: none;
    cursor: pointer;
  }
  
  .dots button.active {
    background-color: white;
  }
  </style>