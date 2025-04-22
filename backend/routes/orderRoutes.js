import express from "express"
import {createOrder, paidOrder} from "../controllers/orderController.js"
import { authMiddleware } from '../middleware/authMiddleware.js'

const router = express.Router()
router.post('/createOrder', authMiddleware, createOrder)
router.post('/paid', authMiddleware, paidOrder)

export default router