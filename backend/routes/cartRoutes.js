import express from 'express'
import { index, getCartByUser } from '../controllers/cartController.js'
import { addProductToCart } from '../controllers/cartController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'

const router = express.Router()
router.get('/', index)
router.get('/user/:user_id', getCartByUser)
router.put('/addProductToCart', authMiddleware, addProductToCart)

export default router