import Cart from "../models/Cart.js"
import mongoose from 'mongoose'

export const index = async (req, res) => {
    try {
        const carts = await Cart.find()
        res.json(carts)
    } catch (error) {
        console.error("Error fetching carts:", error);
        res.status(500).json({ message: "Terjadi kesalahan saat mengambil data cart." })
    }
}

export const getCartByUser = async(req, res) =>{
    const {user_id} =req.params
    

    try {
        const cart = await Cart.find({ user_id }).populate('items.product_id')
        res.json(cart)
    } catch (error) {
        console.error("❌ Error getCartByUser:", error)
        res.status(500).json({ message: "Gagal mengambil cart" })
    }
}

export const addProductToCart = async(req, res) =>{
    try{
        const {product_id} = req.body
        const idUser = req.user._id
        const cart = await Cart.findOne({user_id: idUser})

        if (cart) {
            
            const itemIndex = cart.items.findIndex(item => item.product_id.equals(product_id))
            
            if (itemIndex > -1) {
              cart.items[itemIndex].quantity += 1
            } else {
              cart.items.push({ product_id, quantity: 1 })
            }
      
            
            cart.updated_at = new Date()
            await cart.save()
            const populatedCart = await Cart.findById(cart._id).populate('items.product_id');
            return res.status(200).json(populatedCart)
        } else {
            const newCart = new Cart({
              user_id: idUser,
              items: [{ product_id, quantity: 1 }],
              status: 'active'
            })
      
            await newCart.save()
            const populatedCart = await Cart.findById(newCart._id).populate('items.product_id');
            return res.status(201).json(populatedCart)
        }     
        
    } catch(error){
        console.error("Error fetching carts:", error);
        res.status(500).json({ message: "Terjadi kesalahan saat mengambil data cart." })
    }
}

export const decreaseProductCart = async (req, res) => {
    try{
        const {product_id} = req.body
        const idUser = req.user._id
        const cart = await Cart.findOne({user_id: idUser})

        if(!cart){
            res.status(404).json({message:"data cart tidak ditemukan"})
        }
        
        const itemIndex = cart.items.findIndex(item => item.product_id.equals(product_id))

        if (itemIndex === -1) {
            return res.status(404).json({ message: 'Produk tidak ditemukan di cart.' })
        }

        cart.items[itemIndex].quantity -= 1
        if (cart.items[itemIndex].quantity <= 0) {
            cart.items.splice(itemIndex, 1)
        }

        cart.updated_at = new Date()
        await cart.save()
    
        const populatedCart = await Cart.findById(cart._id).populate('items.product_id')
        return res.status(200).json(populatedCart)

    } catch (error){
        console.error("Error fetching carts:", error);
        res.status(500).json({ message: "Terjadi kesalahan saat mengambil data cart." })
    }
}

export const deleteCart = async (req, res) => {
    try{
        const {product_id} = req.body
        const idUser = req.user._id
        const cart = await Cart.findOne({user_id: idUser})

        if(!cart){
            res.status(404).json({message:"data cart tidak ditemukan"})
        }
        
        const itemIndex = cart.items.findIndex(item => item.product_id.equals(product_id))

        if (itemIndex === -1) {
            return res.status(404).json({ message: 'Produk tidak ditemukan di cart.' })
        }

        cart.items = cart.items.filter(item => !item.product_id.equals(product_id));


        cart.updated_at = new Date()
        await cart.save()
    
        const populatedCart = await Cart.findById(cart._id).populate('items.product_id')
        return res.status(200).json(populatedCart)

    } catch (error){
        console.error("Error fetching carts:", error);
        res.status(500).json({ message: "Terjadi kesalahan saat mengambil data cart." })
    }
}