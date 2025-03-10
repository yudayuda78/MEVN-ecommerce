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

    <div class="filter-range">
      <label>Harga</label>
      <div class="range-slider">
        <input
          type="range"
          min="100"
          max="500"
          v-model="minValue"
          @input="updateRange"
        />
        <input
          type="range"
          min="100"
          max="500"
          v-model="maxValue"
          @input="updateRange"
        />
        <div class="slider-track" :style="trackStyle"></div>
      </div>
      <div class="range-values">
        <span>{{ minValue }}</span>
        <span>{{ maxValue }}</span>
      </div>
    </div>

    <div class="color">
      <ul>
        Color
      </ul>
      <li>Red</li>
      <li>Blue</li>
      <li>Green</li>
      <li>Yellow</li>
      <li>White</li>
      <li>Black</li>
    </div>
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



const minValue = ref(100);
const maxValue = ref(500);

const trackStyle = computed(() => {
  let minPercent = ((minValue.value - 100) / 400) * 100;
  let maxPercent = ((maxValue.value - 100) / 400) * 100;
  return `background: linear-gradient(to right, #ddd ${minPercent}%, #000 ${minPercent}%, #000 ${maxPercent}%, #ddd ${maxPercent}%);`;
});

const updateRange = () => {
  if (minValue.value > maxValue.value) {
    [minValue.value, maxValue.value] = [maxValue.value, minValue.value];
  }
};

const applyFilter = () => {
  
  productStore.fetchProducts(selectedCategories.value);
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
  -webkit-appearance: none;
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
</style>
