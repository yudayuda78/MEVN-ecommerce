<script setup>

import FormAccount from '@/components/form/FormAccount.vue';
import Navbar from '@/components/Navbar.vue';
</script>

<template>
  <Navbar></Navbar>
  <div class="form-account-wrapper">
    <FormAccount />
  </div>
</template>


<style scoped>
  .form-account-wrapper {
      margin-top: 90px;
  }
</style>