<template>
  <div class="sidebar">
    <div class="category">
      <ul>
        Category
      </ul>
      <li v-for="category in categories" :key="category">
        <input type="checkbox" :id="category"  :value="category" v-model="selectedCategories" @change="applyFilter"/>
        <label :for="category">{{ category }}</label>
      </li>
    </div>

    <div class="color">
      <ul>
        Color
      </ul>
      
      <li v-for="(hex, color) in colorContent" :key="color">
        <input 
        type="checkbox" 
        :id="color"  
        :value="color" 
        v-model="selectedColors"
        @change="applyFilter"
      >
        <label :for="color" class="color-label">
          <div class="color-box" :style="{ backgroundColor: hex }"></div>
            {{ color }}
        </label>
      
      </li>
    </div>

    <div class="filter-range">
      <label>Harga</label>
      <div class="range-slider">
        <input
          type="range"
          :min="minLimit"
          :max="maxLimit"
          :step="10000"
          v-model="minValue"
          @input="adjustToStep"
        />
        <input
          type="range"
          :min="minLimit"
          :max="maxLimit"
          :step="10000"
          v-model="maxValue"
          @input="adjustToStep"
        />
        <div class="slider-track" :style="trackStyle"></div>
      </div>
      <div class="range-values">
        <span>Rp {{ formatPrice(minValue) }}</span>
        <span>Rp {{ formatPrice(maxValue) }}</span>
      </div>
    </div>

    <button class="apply-filter" @click="applyFilter">Terapkan Filter</button>
   
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useProductStore } from "@/stores/productStore";

defineProps({
  DataList: {
    type: Array,
    required: true,
  },
});

const productStore = useProductStore()
const selectedCategories = ref([])
const categories = ref(['futsal', 'sepakbola', 'running',  'lifestyle' ])
const color = ref(['red', 'blue', 'black', 'white', 'yellow', 'green'])
const colorContent = ref({
  red: '#E63946',
  blue: '#457B9D',
  green: '#2A9D8F',
  white: '#F8F9FA',
  black: '#212529',
  yellow: '#E9C46A'
})
const selectedColors = ref([])
console.log(selectedCategories.value)




const minLimit = 10000;
const maxLimit = 5000000;
const minValue = ref(minLimit);
const maxValue = ref(maxLimit);

const trackStyle = computed(() => {
  let minPercent = ((minValue.value - minLimit) / (maxLimit - minLimit)) * 100;
  let maxPercent = ((maxValue.value - minLimit) / (maxLimit - minLimit)) * 100;

  return `background: linear-gradient(to right, #ddd ${minPercent}%, #000 ${minPercent}%, #000 ${maxPercent}%, #ddd ${maxPercent}%);`;
})



const adjustToStep = () => {
  minValue.value = Math.round(minValue.value / 10000) * 10000;
  maxValue.value = Math.round(maxValue.value / 10000) * 10000;
};

// Format harga agar lebih rapi
const formatPrice = (value) => {
  return new Intl.NumberFormat("id-ID").format(value);
};

const applyFilter = () => {
  
  productStore.fetchProducts(
    selectedCategories.value, 
    selectedColors.value,
    minValue.value, 
    maxValue.value
  );
  
};
</script>

<style scoped>
.sidebar {
  position: fixed;
  left: 0;
  top: 60px;
  width: 250px;
  height: calc(100vh - 60px);
  padding: 20px;
  background: #f9f9f9;
  border-right: 1px solid #ddd;
  overflow-y: auto;
  z-index: 1000;
}

.category {
  margin-left: 20px;
}

.color {
  margin-left: 20px;
}

ul {
  font-weight: bold;
  margin-bottom: 10px;
}

li {
  list-style: none;
  margin-bottom: 5px;
}

.filter-range {
  display: flex;
  flex-direction: column;
  margin: 20px 0 20px 20px;
}

.filter-range label {
  font-weight: bold;
  margin-bottom: 10px;
}

.range-slider {
  display: flex;
  position: relative;
  width: 100%;
}

.range-slider input[type="range"] {
  position: absolute;
  width: 100%;
  appearance: none; /* Standar */
  -webkit-appearance: none; /* Safari & Chrome */
  -moz-appearance: none; 
  background: transparent;
  pointer-events: none;
}

.range-slider input[type="range"]::-webkit-slider-runnable-track {
  height: 5px;
  background: transparent;
}

.range-slider input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 15px;
  height: 15px;
  background: #000;
  border-radius: 50%;
  pointer-events: auto;
  position: relative;
  z-index: 2;
}

.slider-track {
  position: absolute;
  height: 5px;
  top: 50%;
  left: 0;
  width: 100%;
  transform: translateY(-50%);
  background: #ddd;
  border-radius: 5px;
  z-index: 1;
}

.range-values {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 5px;
}
.color label{
  display: flex;
}

.color-box{
 
  width: 20px;
  height: 20px;
  border-radius: 50%;
}
</style>
