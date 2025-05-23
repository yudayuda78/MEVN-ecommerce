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

    return{
        orderData,
        getInvoice
    }
})

