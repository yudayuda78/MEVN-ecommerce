import mongoose, { mongo } from "mongoose"

const orderSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    items: [
        {
            product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            quantity: Number,
            price: Number
        }
    ],
    total_price: Number,
    status: { type: String, 
        enum: ['pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded', 'failed'],
        default: 'pending'},
    payment_method: String,
    created_at: { type: Date, default: Date.now }
})

const Order = mongoose.model('Order', orderSchema, 'order')
export default Order