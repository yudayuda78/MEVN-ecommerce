import Product from '../models/Product.js'

export const index = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products)
    } catch (err) {
        res.status(500).json({ message: "Terjadi kesalahan pada server!" })
    }
}

export const man = async(req, res)=> {
    let pd = Product
    res.json(pd)
    // try{
    //     const producstMan = await Product.find({jenis: 'man'})
    //     res.json(productsMan)
    // }catch(error){
    //     res.status(500).json({message:"terjadi kesalahan pada query"})
    // }
}

export const woman = async (req, res) => {
    try {
        const productsWoman = await Product.find({jenis: 'woman'})
        res.json(productsWoman)
    }catch(err){
        res.status(500).json({ message: "Terjadi kesalahan pada server!" })
    }
}
