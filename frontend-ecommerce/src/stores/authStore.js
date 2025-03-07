import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useAuthStore = defineStore('auth', () => {
    const isLoggedIn = ref(false)
    const user = ref({})
    const token = ref(localStorage.getItem('token') || null)

    if (token.value) {
        isLoggedIn.value = true
        axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
    }

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

    const loginUser = async (loginData) =>{
        try{
            const response = await axios.post('http://localhost:9887/api/user/login', loginData)
            if (!response.data.token) throw new Error("Token tidak ditemukan")
            
            token.value = response.data.token
            user.value = response.data.user
            isLoggedIn.value = true

            localStorage.setItem('token', token.value)
            axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`

            return true
        }catch(error){
            alert(error.response?.data?.message || "Login gagal!")
            console.error("❌ Login gagal:", error.response ? error.response.data : error.message)
            return false
        }
    }

    const logoutUser = () => {
        token.value = null
        user.value = null
        isLoggedIn.value = false

        // Hapus token dari localStorage
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']
    }

    const getUser = async () =>{
        try{
            const response = await axios.get('http://localhost:9887/api/user/getUser')
            
            user.value = response.data.user
            return user.value
        } catch(error){
            console.error("❌ Gagal mengambil data user:", error.response ? error.response.data : error.message)
            return null
        }
        
    }

    return { isLoggedIn, user, token, registerUser, loginUser, logoutUser, getUser }
})
