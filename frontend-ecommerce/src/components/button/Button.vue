<script setup>
defineOptions({ inheritAttrs: false })
</script>

<template>
    <button :class="['default-button', $attrs.class]" v-bind="$attrs">
      <slot />
    </button>
</template>


<style scoped>
.default-button {
  background-color: black;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
</style>