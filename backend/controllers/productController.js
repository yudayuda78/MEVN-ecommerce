import Product from '../models/Product.js'

export const index = async (req, res) => {
    try {
        const { jenis, kategori } = req.query
        let filter = {}

        if (jenis) filter.jenis = jenis
        if (kategori) filter.kategori = kategori
        const products = await Product.find(filter);
        res.json(products)
    } catch (err) {
        res.status(500).json({ message: "Terjadi kesalahan pada server!" })
    }
}




