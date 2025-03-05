import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useAuthStore = defineStore('auth', () => {
    const isLoggedIn = ref(false)
    const user = ref(null)

    const registerUser = async (registerData) => {
        try {
            const response = await axios.post('http://localhost:9887/api/user/register', registerData)

            if (response.status !== 201) throw new Error(response.data.message || "Pendaftaran gagal!")
            
            alert("Pendaftaran berhasil! Silakan login.")
            return true
        } catch (error) {
            alert(error.response?.data?.message || "Terjadi kesalahan!")
            console.error("❌ Registrasi gagal:", error.response ? error.response.data : error.message);
            return false
        }
    }

    return { isLoggedIn, user, registerUser }
})
