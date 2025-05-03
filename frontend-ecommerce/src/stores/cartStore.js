import { defineStore } from "pinia"
import { ref, computed } from "vue"
import axios from "axios"

export const useCartStore = defineStore('cart', () => {
    const cartItems = ref([])
    const productID = ([])

    const addToCart = async(productID) => {
        try{
            const token = localStorage.getItem('token')
            const response = await axios.put(
                'http://localhost:9887/api/cart/addProductToCart', 
                { product_id: productID },
                {
                  headers: {
                    Authorization: `Bearer ${token}`
                  }
                }
            )
            console.log('produk berhasil ditambahkan')
                
            
        }catch(error){
            console.log(error)
        }
    }

    return{
        addToCart
    }
    
})