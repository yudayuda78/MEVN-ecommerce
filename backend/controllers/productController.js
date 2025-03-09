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
    try {
        const { jenis, kategori } = req.query
        let filter = {}

        

        if (jenis) filter.jenis = jenis; // Tambahkan filter jika ada
        if (kategori) filter.kategori = kategori;
       

        let pd = await Product.find(filter);
        

        res.json(pd);
    } catch (error) {
        res.status(500).json({ error: "Terjadi kesalahan saat mengambil data" });
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
