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

export const paidOrder = async(req, res)=>{
    try{
        const idOrder = req.body._id
        const order = await Order.findOne({_id: idOrder})

        if(!order){
            res.status(404).json({message:"data order tidak ditemukan"})
        }

        order.status = "paid"
        await order.save()
        res.status(201).json({ message: 'Order berhasil dibayar', order })

    }catch(error){
        console.error("Error paid", error)
        res.status(500).json({message: "terjadi kesalahan saat mengubah data"})
    }
}

export const shippingOrder = async(req, res)=>{
    try{
        const idOrder = req.body._id
        const order = await Order.findOne({_id: idOrder})

        if(!order){
            return res.status(404).json({ message: "Data order tidak ditemukan" })
        }

        order.status = "shipping"
        await order.save()
        res.status(200).json({ message: 'Order berhasil dibayar', order })
        
    }catch(error){
        console.error("Error shipping", error)
        res.status(500).json({message: "terjadi kesalahan saat mengubah data"})
    }
}

export const deliveredOrder = async(req, res)=>{
    try{
        const idOrder = req.body._id
        const order = await Order.findOne({_id: idOrder})

        if(!order){
            return res.status(404).json({ message: "Data order tidak ditemukan" })
        }

        order.status = "delivered"
        await order.save()
        res.status(200).json({ message: 'Order berhasil dibayar', order })
        
    }catch(error){
        console.error("Error delivered", error)
        res.status(500).json({message: "terjadi kesalahan saat mengubah data"})
    }
}

export const canceledOrder = async(req, res)=>{
    try{
        const idOrder = req.body._id
        const order = await Order.findOne({_id: idOrder})

        if(!order){
            return res.status(404).json({ message: "Data order tidak ditemukan" })
        }

        order.status = "canceled"
        await order.save()
        res.status(200).json({ message: 'Order berhasil dibayar', order })
        
    }catch(error){
        console.error("Error delivered", error)
        res.status(500).json({message: "terjadi kesalahan saat mengubah data"})
    }
}