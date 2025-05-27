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
    resi: String,
    payment_method: String,
    invoice_url: String,
    external_id: String,
    created_at: { type: Date, default: Date.now }
})

const Order = mongoose.model('Order', orderSchema, 'order')
export default Order