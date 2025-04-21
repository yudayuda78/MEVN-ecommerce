import Order from "../models/Order.js"


export const createOrder = async(req, res)=>{
    try{
        const idUser = req.user._id
        const { items, payment_method } = req.body

        const total_price = items.reduce((total, item) => {
            return total + (item.price * item.quantity)
        }, 0)
    
        const newOrder = new Order({
            user_id: idUser,
            items,
            total_price,
            payment_method
        })


        await newOrder.save()
        res.status(201).json({ message: 'Order berhasil dibuat', order: newOrder })

    }catch(error){
        console.error("Error fetching carts:", error);
        res.status(500).json({ message: "Terjadi kesalahan saat mengambil data cart." })
    }
} 