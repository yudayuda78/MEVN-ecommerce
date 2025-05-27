import express from "express"
import {createOrder, paidOrder, shippingOrder, deliveredOrder, canceledOrder, getOrder, getOrderById, updateOrder} from "../controllers/orderController.js"
import { authMiddleware } from '../middleware/authMiddleware.js'

const router = express.Router()
router.get('/getOrder', getOrder )
router.patch('/updateOrder/:id', updateOrder)
router.get('/getOrderById/', authMiddleware, getOrderById)
router.post('/createOrder', authMiddleware, createOrder)
router.post('/paid', authMiddleware, paidOrder)
router.post('/shipping', authMiddleware, shippingOrder)
router.post('/delivered', authMiddleware, deliveredOrder)
router.post('/cancel', authMiddleware, canceledOrder)

export default router