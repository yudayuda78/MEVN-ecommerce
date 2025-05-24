import express from 'express'
import { index, getCartByUser, decreaseProductCart, deleteItemCart, deleteCart } from '../controllers/cartController.js'
import { addProductToCart } from '../controllers/cartController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'

const router = express.Router()
router.get('/', index)
router.get('/product', authMiddleware, getCartByUser)
router.put('/addProductToCart', authMiddleware, addProductToCart)
router.post('/decrease', authMiddleware, decreaseProductCart )
router.delete('/itemDelete', authMiddleware, deleteItemCart)
router.delete('/:cartId', authMiddleware, deleteCart)

export default router