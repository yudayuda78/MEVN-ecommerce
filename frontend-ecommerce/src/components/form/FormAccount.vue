<script setup>
import { onMounted, ref } from "vue"
import { useAuthStore } from "@/stores/authStore"
import axios from "axios"
import Button from "../button/Button.vue"

const authStore = useAuthStore()

const formData = ref({
  name: "",
  address: "",
})

onMounted(async () => {
  if (authStore.isLoggedIn) {
    await authStore.getUser()
    formData.value.name = authStore.user?.name || ""
    formData.value.address = authStore.user?.address || ""
  }
})

const editProfile = async () => {
  try {
    const token = authStore.token
    const response = await axios.put("http://localhost:9887/api/user/editProfile", formData.value, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })

    authStore.updateUser(response.data.user)
    alert("Profil berhasil diperbarui!")
  } catch (error) {
    console.error("Gagal update profil:", error.response?.data || error.message)
    alert("Gagal memperbarui profil.")
  }
}
</script>

<template>
  <div class="profile-page">
    <div class="profile-header">
      <h1>Edit Profil</h1>
      <p>Perbarui informasi pribadi Anda di bawah ini.</p>
    </div>

    <div class="profile-content">
      <form @submit.prevent="editProfile" class="profile-form">
        <div class="form-group">
          <label for="name">Nama Lengkap</label>
          <input
            type="text"
            id="name"
            v-model="formData.name"
            :placeholder="authStore.user.name || 'Nama lengkap'"
          />
        </div>

        <div class="form-group">
          <label for="address">Alamat</label>
          <input
            type="text"
            id="address"
            v-model="formData.address"
            :placeholder="authStore.user.address || 'Alamat lengkap'"
          />
        </div>

        <Button type="submit" class="btn-save">Simpan Perubahan</Button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.profile-page {
  max-width: 700px;
  margin: 60px auto;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  font-family: "Segoe UI", sans-serif;
}

.profile-header {
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 20px;
  margin-bottom: 30px;
}

.profile-header h1 {
  font-size: 26px;
  font-weight: bold;
  margin-bottom: 8px;
  color: #333;
}

.profile-header p {
  font-size: 15px;
  color: #777;
}

.profile-content {
  padding: 0;
}

.profile-form .form-group {
  margin-bottom: 22px;
}

label {
  display: block;
  margin-bottom: 6px;
  font-weight: 600;
  color: #444;
}

input {
  width: 100%;
  padding: 12px 16px;
  font-size: 15px;
  border: 1px solid #ccc;
  border-radius: 6px;
  background-color: #fafafa;
  transition: border 0.3s ease;
}

input:focus {
  border-color: #4a90e2;
  outline: none;
  background-color: #fff;
}

.btn-save {
  margin-top: 10px;
  width: 100%;
  padding: 14px 0;
  background-color: #4a90e2;
  color: white;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-save:hover {
  background-color: #515151;
}
</style>
