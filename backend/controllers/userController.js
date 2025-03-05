import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export const index = async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan!", error })
    }
}

export const register = async (req, res) => {
    try {
        console.log("Data diterima:", req.body)

        const { username, password, name, address, email } = req.body

        //handler untuk unique
        const existingUser = await User.findOne({ username })
        if (existingUser) return res.status(400).json({ message: "Username sudah digunakan!" })
        const existingEmail = await User.findOne({email})
        if (existingEmail) return res.status(400).json({message: "Email telah digunakan"})



        // Simpan user baru
        const user = new User({ username, password, name, address, email })
        await user.save()

        res.status(201).json({ message: "User berhasil didaftarkan!", user })
    } catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan!", error })
    }
}

export const login = async (req, res) => {
    try{
        const { email, password } = req.body

        // cek apakah user ada
        const user = await User.findOne({email})
        if (!user) return res.status(400).json({message:"Email atau User tidak ada"})

        //cek password
        const passMatch = await bcrypt.compare(password, user.password)
        if (!passMatch) return res.status(400).json({message:"Password Salah"})

        //generate JWT
        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn: "1h"})

        res.json({
            message: "Login berhasil!",
            user: { id: user._id, name: user.name, email: user.email },
            token
        })

    }catch(error){
        res.status(500).json({ message: "Terjadi kesalahan!", error })
    }
}

