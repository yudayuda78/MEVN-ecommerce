import express from "express"
import {createOrder} from "../controllers/orderController.js"
import { authMiddleware } from '../middleware/authMiddleware.js'

const router = express.Router()
router.post('/createOrder', authMiddleware, createOrder)

export default router