import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
// import cookieParser from 'cookie-parser'
// import morgan from 'morgan'

dotenv.config()

const app = express()
const PORT = process.env.PORT

// Middleware untuk parsing JSON
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use(cookieParser())
// if(process.env.NODE_ENV === "development"){
//     app.user(morgan(dev))
// }


// Cors
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
import cartRoutes from './routes/cartRoutes.js'

app.use('/api/product', productRoutes)
app.use('/api/user', userRoutes) 
app.use('/api/cart', cartRoutes)


// Tes endpoint utama
app.get('/', (req, res) => {
    res.send("Server berjalan...");
});

app.listen(PORT, () => {
    console.log(`🚀 Server berjalan di: http://localhost:${PORT}`);
});


