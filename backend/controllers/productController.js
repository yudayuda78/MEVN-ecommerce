import Product from '../models/Product.js'

export const index = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products)
    } catch (err) {
        res.status(500).json({ message: "Terjadi kesalahan pada server!" })
    }
}

export const woman = async (req, res) => {
    try {
        const productsWoman = await Product.find({jenis: 'woman'})
        res.json(productsWoman)
    }catch(err){
        res.status(500).json({ message: "Terjadi kesalahan pada server!" })
    }
}
