import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
    nama_produk: String,
    slug: String,
    kategori: String,
    jenis: String,
    jumlah: Number,
    harga: Number,
    color: String,
    image: String
});

const Product = mongoose.model('Product', productSchema, 'product')
export default Product
