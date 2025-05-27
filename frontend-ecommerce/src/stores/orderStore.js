import { defineStore } from "pinia"
import axios from "axios"
import { ref } from "vue"

export const useOrderStore = defineStore('order', () => {

    const orderData = ref([])
    const getInvoice = async()=>{
        try{
            const response = await axios.get('http://localhost:9887/api/order/getOrder')
         
            orderData.value = response.data.order
        }catch(error){
            console.log(error)
        }
    }

    const getOrderById = async ()=> {
        try{
            const token = localStorage.getItem('token')
            const response = await axios.get('http://localhost:9887/api/order/getOrderById',
                {
                    headers: {
                        Authorization: `Bearer ${token}` 
                    }
                }
            )
           
            orderData.value = response.data
        }catch(error){
            console.log(error)
        }
    }

    const updateOrder = async (orderId) => {
        try{
            const response = await axios.patch(`http://localhost:9887/api/order/updateOrder/${orderId}`,

            )
        }catch(error){
            console.log(error)
        }
    }

    return{
        orderData,
        getInvoice,
        getOrderById,
        updateOrder
    }
})

