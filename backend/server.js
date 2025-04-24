// server.js
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import app from './app.js'

dotenv.config()

const PORT = process.env.PORT || 5000

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("✅ Koneksi MongoDB berhasil!")
        app.listen(PORT, () => {
            console.log(`🚀 Server berjalan di: http://localhost:${PORT}`)
        })
    })
    .catch(err => console.error("❌ Koneksi MongoDB gagal:", err))
