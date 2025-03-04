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

