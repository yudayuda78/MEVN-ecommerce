import mongoose from "mongoose"
import Product from "../models/Product.js"
import { response } from "express"
import {ObjectId} from 'mongodb'



export const addProduct = async(req, res) => {
    try{
        const { nama_product, harga, image, jenis, jumlah, kategori, color} = req.body
        const slug = nama_product.split(' ').join('-')
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