import { defineStore } from "pinia"
import { ref, computed } from "vue"
import axios from "axios"

export const useCartStore = defineStore('cart', () => {
    const cartItems = ref([])
    

    const getProductByUser = async () => {
        try{
            const token = localStorage.getItem('token')
            const response = await axios.get(
                'http://localhost:9887/api/cart/product',
                {
                    headers: {
                      Authorization: `Bearer ${token}`
                    }
                  } 
            )

            cartItems.value = response.data // ← simpan hasil ke state
            console.log('Cart Items:', JSON.stringify(cartItems.value, null, 2));
        }catch(error){
            console.log(error)
        }
    }

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
            await getProductByUser()
                
            
        }catch(error){
            console.log(error)
        }
    }

    return{
        cartItems,
        getProductByUser,
        addToCart
    }
    
})