import express from "express"
import {createOrder, paidOrder, shippingOrder, deliveredOrder, canceledOrder, getOrder} from "../controllers/orderController.js"
import { authMiddleware } from '../middleware/authMiddleware.js'

const router = express.Router()
router.get('/getOrder', getOrder )
router.post('/createOrder', authMiddleware, createOrder)
router.post('/paid', authMiddleware, paidOrder)
router.post('/shipping', authMiddleware, shippingOrder)
router.post('/delivered', authMiddleware, deliveredOrder)
router.post('/cancel', authMiddleware, canceledOrder)

export default router