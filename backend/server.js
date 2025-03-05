import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT

// Middleware untuk parsing JSON
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use(cors({ 
    origin: 'http://localhost:5173',
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization'
}));



// Koneksi ke MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ Koneksi MongoDB berhasil!"))
    .catch(err => console.error("❌ Koneksi MongoDB gagal:", err))

// Import routes
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
app.use('/api/product', productRoutes)
app.use('/api/user', userRoutes) 

// Tes endpoint utama
app.get('/', (req, res) => {
    res.send("Server berjalan...");
});

app.listen(PORT, () => {
    console.log(`🚀 Server berjalan di: http://localhost:${PORT}`);
});
