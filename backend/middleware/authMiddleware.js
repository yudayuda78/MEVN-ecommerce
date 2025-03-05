import jwt from 'jsonwebtoken'

export const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization")
    if(!token) return res.status(401).json({message: "Akses ditolak! Token tidak ditemukan."})
    
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET)
        req.user = verified
        next()
    } catch (error) {
        res.status(400).json({ message: "Token tidak valid!" })
    }
}