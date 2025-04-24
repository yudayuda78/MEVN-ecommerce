// app.js
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
// import cookieParser from 'cookie-parser'
// import morgan from 'morgan'

dotenv.config()

const app = express()

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use(cookieParser())
// if(process.env.NODE_ENV === "development"){
//     app.use(morgan("dev"))
// }

// CORS
app.use(cors({ 
    origin: 'http://localhost:5173',
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization'
}))

// Routes
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import cartRoutes from './routes/cartRoutes.js'
import orderRoutes from './routes/orderRoutes.js'

app.use('/api/product', productRoutes)
app.use('/api/user', userRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/order', orderRoutes)

app.get('/', (req, res) => {
    res.send("Server berjalan...");
})

export default app
