import Product from '../models/Product.js'

export const index = async (req, res) => {
    try {
        
        const { jenis, kategori, color, minPrice = 10000, maxPrice = 100000000, search, page = 1, limit = 12 } = req.query
        let filter = {}

        if (jenis) filter.jenis = jenis
        if (kategori) filter.kategori = { $in: kategori.split(",") }
        if (color) filter.color = { $in: color.split(",") }
        const min = parseInt(minPrice) || 10000;
        const max = parseInt(maxPrice) || 100000000;

        filter.harga = { $gte: min, $lte: max };
        
        if (search) {
            filter.nama_product = { $regex: search, $options: "i" }; // Case-insensitive search
        }

        const pageNumber = parseInt(page) || 1;
        const pageSize = parseInt(limit) || 12;
        const skip = (pageNumber - 1) * pageSize;

        // Hitung total produk yang sesuai filter
        const totalProducts = await Product.countDocuments(filter)

        const products = await Product.find(filter).skip(skip).limit(pageSize)
        res.json( {data: products,
            current_page: pageNumber,
            last_page: Math.ceil(totalProducts / pageSize),
            per_page: pageSize,
            total: totalProducts,})
    } catch (err) {
        res.status(500).json({ message: "Terjadi kesalahan pada server!" })
    }
}

export const show = async(req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findById(id)

        if (!product) {
            return res.status(404).json({ message: "Produk tidak ditemukan!" })
        }

        res.json(product);
    } catch (err) {
        res.status(500).json({ message: "Terjadi kesalahan pada server!" })
    }

}




