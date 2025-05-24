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
            // console.log('Cart Items:', JSON.stringify(cartItems.value, null, 2));
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

    const decrease = async (productID) => {
        try {
            const token = localStorage.getItem('token')
            const response = await axios.post(
                'http://localhost:9887/api/cart/decrease', 
                { product_id: productID },
                {
                  headers: {
                    Authorization: `Bearer ${token}`
                  }
                }
            )
            console.log('produk berhasil dikurangi')
            await getProductByUser()

        }catch(error){
            console.log(error)
        }

    }

    const deleteItemCart = async (cartItemID) => {
        try{
            const token = localStorage.getItem('token')
            console.log(cartItemID)
            const response = await axios.post('http://localhost:9887/api/cart/delete',
                { product_id: cartID },
                {
                  headers: {
                    Authorization: `Bearer ${token}`
                  }
                }
            )
            
            console.log('produk berhasil dihapus')
            await getProductByUser()
        }catch(error){
            
        }
    }

    const deleteCart = async(cartID) => {
        try{
            const token = localStorage.getItem('token')
            const response = await axios.delete(`http://localhost:9887/api/cart/${cartID}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}` 
                    }
                }
            )
            console.log('produk berhasil dihapus')
            await getProductByUser()
        }catch(error){
            console.log(error)
        }
    }

    return{
        cartItems,
        getProductByUser,
        addToCart,
        decrease,
        deleteItemCart,
        deleteCart
    }
    
})