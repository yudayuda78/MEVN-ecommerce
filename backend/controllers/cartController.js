import Cart from "../models/Cart.js";

export const index = async (req, res) => {
    try {
        const carts = await Cart.find(); // Ambil semua data cart
        res.json(carts); // Kirim sebagai response JSON
    } catch (error) {
        console.error("Error fetching carts:", error);
        res.status(500).json({ message: "Terjadi kesalahan saat mengambil data cart." });
    }
}

export const getCartByUser = async(req, res) =>{
    const {user_id} =req.params
    

    try {
        const cart = await Cart.find({ user_id })
        res.json(cart)
    } catch (error) {
        console.error("❌ Error getCartByUser:", error)
        res.status(500).json({ message: "Gagal mengambil cart" })
    }
}