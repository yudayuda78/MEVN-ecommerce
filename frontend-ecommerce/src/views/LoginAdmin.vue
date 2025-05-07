<script setup>
import Button from "@/components/button/Button.vue"
import { ref } from "vue";

const username = ref('')
const password = ref('')

const coba = () =>{
    console.log(username.value)
    console.log(password.value)
}

</script>

<template>
  <div class="container-form">
    <div class="form-group">
      <input
        id="username"
        v-model="username"
        type="text"
        class="input-field"
        placeholder=" "
      />
      <label for="username">Username</label>
    </div>

    <div class="form-group">
      <input
        id="password"
        v-model="password"
        type="password"
        class="input-field"
        placeholder=" "
      />
      <label for="password">Password</label>
    </div>

    <Button class="login-button" @click="coba">Login</Button>
  </div>
</template>

<style scoped>
:global(body) {
  margin: 0;
  padding: 0;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f1f5f9; /* Warna latar belakang modern */
  font-family: 'Inter', sans-serif;
}

.container-form {
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  background-color: #fff;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
}

.form-group {
  position: relative;
  margin-bottom: 1.8rem;
}

label {
  position: absolute;
  top: 50%;
  left: 1rem;
  transform: translateY(-50%);
  color: #999;
  background-color: #fff;
  padding: 0 0.25rem;
  transition: 0.2s ease all;
  pointer-events: none;
  font-size: 0.95rem;
}

.input-field {
  width: 100%;
  padding: 1rem 1rem 0.5rem 1rem;
  border: 1.5px solid #ddd;
  border-radius: 12px;
  font-size: 1rem;
  background-color: transparent;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.input-field:focus {
  border-color: #00bcd4;
  outline: none;
  box-shadow: 0 0 0 3px rgba(0, 188, 212, 0.15);
}

.input-field:focus + label,
.input-field:not(:placeholder-shown) + label {
  top: 0;
  left: 0.75rem;
  font-size: 0.75rem;
  color: #00bcd4;
  background-color: #fff;
  padding: 0 0.25rem;
  transform: translateY(-50%) scale(0.95);
}

.login-button {
  background: linear-gradient(135deg, #535353, #131313);
  color: #fff;
  border: none;
  padding: 0.9rem;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s, transform 0.2s;
  width: 100%;
}

.login-button:hover {
  background: linear-gradient(135deg, #9f9f9f, #535353);
  transform: translateY(-1px);
}

.login-button:active {
  transform: translateY(1px);
}
</style>
