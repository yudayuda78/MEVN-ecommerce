import mongoose from "mongoose"
import Product from "../models/Product.js"
import Admin from "../models/Admin.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { response } from "express"
import {ObjectId} from 'mongodb'


export const addAdmin = async(req, res) => {
    try{
        const {username, password} = req.body
        const existingUser = await Admin.findOne({username})
        if(existingUser) return res.status(400).json({message:"username telah ada"})
        
        const admin = new Admin({
            username : username,
            password : password
        })
        await admin.save()

        res.status(201).json({ message: "Admin berhasil didaftarkan!", user })
    }catch(error){
        console.error("Error adding product:", error);
        return res.status(500).json({ message: "Server error" })
    }
}

export const loginAdmin = async(req, res)=> {
    try{
        const {username, password} = req.body

        const user = await Admin.findOne({username})
        if(!user) return res.status(400).json({message:"username salah/tidak ditemukan"})

        const passMatch = await bcrypt.compare(password, user.password)
        if(!passMatch) return res.status(400).json({message:"password salah"})

        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn: "1h"})
        res.json({
            message: "Login berhasil!",
            user: { id: user._id, name: user.username},
            token
        })
    }catch(error){
        console.error("Tidak bisa login", error);
        return res.status(500).json({ message: "Server error" })
    }
}

export const getAdmin = async (req, res)=> {
    
    const admin = await Admin.findById(req.admin.id).select("-password")
    if(admin){
        return res.status(200).json({
            admin
        })
    }

    return res.status(400).json({message: "admin tidak ada"})
}

export const getProduct = async(req, res) => {
    try{
        const product =  await Product.find()
        res.status(202).json({
            message: "Produk berhasil didapatkan",
            data: product,
        });

    }catch(error){
        console.error("Error get product", error);
        return res.status(500).json({ message: "Server error" });
    }
}

export const addProduct = async(req, res) => {
    try{
        const { nama_product, harga, jenis, jumlah, kategori, color} = req.body
        const slug = nama_product.split(' ').join('-')
        const image = req.files?.[0]?.filename
        ? `/public/${req.files[0].filename}`
        : '';
        const newData = Product({
            nama_product: nama_product,
            harga: harga, 
            image: image,
            jenis: jenis,
            jumlah: jumlah,
            kategori: kategori,
            slug: slug,
            color: color,
        })

        console.log(newData)

        const savedProduct = await newData.save()

        res.status(201).json({
            message: "Produk berhasil ditambahkan",
            data: savedProduct,
        });

    }catch(error){
        console.error("Error adding product:", error);
        return res.status(500).json({ message: "Server error" });
    }
}

export const deleteProduct = async (req, res) =>{
    try{
        const {product_id} = req.body
      
        const product = await Product.findOne({_id : product_id})
        await Product.deleteOne({ _id: product_id });

        return res.status(200).json({
            message: "Data produk berhasil dihapus",
            data: product
        });
    }catch(error){
        console.error("Error adding product:", error);
        return res.status(500).json({ message: "Server error" });
    }
}

export const increaseProduct = async(req, res) => {
    try{
        const {product_id}  = req.body
        const product = await Product.findOne({_id: product_id})
        if (!product) {
            return res.status(404).json({ message: "Produk tidak ditemukan" });
        }
        product.jumlah += 1
        const updatedProduct = await product.save()
        return res.status(200).json({
            message: "Data produk berhasil ditambah",
            data: updatedProduct
        });
    }catch(error){
        console.error("Error increase product:", error);
        return res.status(500).json({ message: "Server error" });
    }
}

export const decreaseProduct = async(req, res) => {
    try{
        const {product_id}  = req.body
        const product = await Product.findOne({_id: product_id})
        if (!product) {
            return res.status(404).json({ message: "Produk tidak ditemukan" });
        }
        product.jumlah -= 1
        const updatedProduct = await product.save()
        return res.status(200).json({
            message: "Data produk berhasil ditambah",
            data: updatedProduct
        });
    }catch(error){
        console.error("Error increase product:", error);
        return res.status(500).json({ message: "Server error" });
    }
}

export const editProduct = async(req, res) =>{
    try{
        const {product_id}  = req.body
        const product = await Product.findOne({_id: product_id})
        if (!product) {
            return res.status(404).json({ message: "Produk tidak ditemukan" });
        }
    }catch(error){
        console.error("Error increase product:", error);
        return res.status(500).json({ message: "Server error" });
    }
}

