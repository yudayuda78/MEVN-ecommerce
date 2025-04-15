import mongoose from 'mongoose'

const testSchema = new mongoose.Schema({
    nama_produk: String,
    slug: String,
    kategori: String,
    jenis: String,
    jumlah: Number,
    harga: Number,
    color: String,
    image: String
});

const Test = mongoose.model('Test', testSchema, 'test')
export default Test
