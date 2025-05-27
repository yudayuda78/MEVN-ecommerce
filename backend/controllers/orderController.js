import Order from "../models/Order.js"
import { Xendit } from 'xendit-node';
import dotenv from 'dotenv'

dotenv.config()

const XENDIT_KEY = process.env.SECRET_API_XENDIT
const xenditClient = new Xendit({ secretKey: `${XENDIT_KEY}` });
const { Invoice } = xenditClient


export const getOrder = async(req, res)=> {
    try{
        const order = await Order.find().populate('user_id').populate('items.product_id')
        res.status(200).json({order})
    }catch(error){
        console.log(error)
    }
}

export const getOrderById = async(req, res) => {
    try{
        const userID = req.user._id

        const orderById = await Order.findOne({user_id: userID}).populate('items.product_id').populate('user_id')
        if (!orderById) {
            return res.status(404).json({ message: "Order tidak ditemukan." });
          }
        res.status(200).json({data : orderById})
    }catch(error){
        console.log(error)
    }
}

export const createOrder = async(req, res)=>{
    try{
        const idUser = req.user._id
        const { items, payment_method, email, name, product_id} = req.body
        // console.log(req.body)

        const total_price = items.reduce((total, item) => {
            return total + (item.price * item.quantity)
        }, 0)
    
        const external_id = `order-${Date.now()}-${Math.floor(Math.random() * 10000)}`

        const invoiceResponse = await Invoice.createInvoice({
            data: {
              externalId: external_id,
              amount: total_price,
              payerEmail: email,
              description: `Pembayaran untuk ${name}`,
              currency: 'IDR',
              invoiceDuration: 86400,
              reminderTime: 1,
              items: items.map(item => ({
                name: item.name || 'Produk',
                quantity: item.quantity,
                price: item.price,
              })),
            }
          })

        const newOrder = new Order({
            user_id: idUser,
            items,
            total_price,
            payment_method,
            invoice_url: invoiceResponse.invoiceUrl,
            external_id: external_id
        })


        await newOrder.save()
        res.status(201).json({ message: 'Order dan invoice berhasil dibuat',
            order: newOrder,
            invoice_url: invoiceResponse.invoiceUrl })

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

export const updateOrder = async(req, res) => {
    try{
        const {id} = req.params
        console.log(id)
        const {status, resi} = req.body
        const order = await Order.findOne({_id: id})

        if(!order){
            return res.status(500).json({message:"Data order tidak ditemukan"})
        }

        order.status = status
        order.resi = resi
        await order.save()
        res.status(200).json({message: 'order berhasil diupdate', order})
    }catch(error){
        console.log(error)
    }
}