import jwt from 'jsonwebtoken';
import User from '../models/User.js'

export const blacklistedTokens = new Set(); // Gunakan Set agar bisa pakai .has()

export const authMiddleware = async (req, res, next) => {
    const token = req.get("Authorization")?.split(" ")[1]
    // console.log(token)
    
    if(!token){
        return next(
            res.status(401).json({
                message: "Anda tidak boleh akses halaman ini"
            })
        )
    }

    if (blacklistedTokens.has(token)) {
        return res.status(401).json({ message: "Silahkan login dahulu" });
    }

    let decoded

    try{
        decoded = await jwt.verify(token, process.env.JWT_SECRET)
    }catch(error){
        return next(
            res.status(401).json({
                message: "Token salah/tidak ada"
            })
        )
    }
    // console.log(decoded)
    const currentUser = await User.findById(decoded.id)
    if(!currentUser){
        return next(
            res.status(401).json({message: "user tidak ada"})
        )
    }

    req.user = currentUser
    next()
};
