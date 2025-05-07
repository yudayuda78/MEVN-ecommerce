import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js'

export const adminMiddleware = async (req, res, next) => {
    const token = req.get("Authorization")?.split(" ")[1]
    if (!token) return res.status(401).json({ message: "Tidak ada token, tidak boleh akses" })

    let decoded
    try {
        decoded = await jwt.verify(token, process.env.JWT_SECRET)
        req.admin = { id: decoded.id }
           
    } catch (error) {
            res.status(401).json({ message: "Token tidak valid" })
    }
    
    
    const currentAdmin = Admin.findById(decoded.id)
    console.log(currentAdmin)
    next()
}