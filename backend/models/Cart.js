import mongoose, { mongo } from "mongoose"

const cartSchema = new mongoose.Schema({
    user_id: mongoose.Schema.Types.ObjectId,
    items: [
        {
            product_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
            },
            quantity: Number
        }
    ],
    status: String,
    updated_at: {
        type: Date,
        default: Date.now
    }
})

const Cart = mongoose.model('Cart', cartSchema, 'cart')
export default Cart