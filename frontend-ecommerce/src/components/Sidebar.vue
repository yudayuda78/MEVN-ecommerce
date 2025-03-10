<template>
  <div class="sidebar">
    <div class="category">
      <ul>
        Category
      </ul>
      <li v-for="Data in DataList" :key="Data">
        <input type="checkbox" :id="Data" />
        <label :for="Data">{{ Data }}</label>
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

<script>
export default {
  props: {
    DataList: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      minValue: 100,
      maxValue: 500,
    };
  },
  computed: {
    trackStyle() {
      let minPercent = ((this.minValue - 100) / 400) * 100;
      let maxPercent = ((this.maxValue - 100) / 400) * 100;
      return `background: linear-gradient(to right, #ddd ${minPercent}%, #000 ${minPercent}%, #000 ${maxPercent}%, #ddd ${maxPercent}%);`;
    },
  },
  methods: {
    updateRange() {
      if (this.minValue > this.maxValue) {
        let temp = this.minValue;
        this.minValue = this.maxValue;
        this.maxValue = temp;
      }
    },
  },
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
