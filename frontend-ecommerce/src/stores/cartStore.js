import { defineStore } from "pinia"
import { ref, computed } from "vue"
import { Axios } from "axios"

export const useCartStore =defineStore('cart', () => {
    const cartItems = ref([])
    
})