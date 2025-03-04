import User from '../models/User.js'

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
        const { username, password, name, address } = req.body

        // Cek apakah user sudah ada
        const existingUser = await User.findOne({ username })
        if (existingUser) return res.status(400).json({ message: "Username sudah digunakan!" })

        // Simpan user baru
        const user = new User({ username, password, name, address })
        await user.save()

        res.status(201).json({ message: "User berhasil didaftarkan!", user })
    } catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan!", error })
    }
}

