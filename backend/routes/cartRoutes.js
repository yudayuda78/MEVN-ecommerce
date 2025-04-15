import express from 'express'
import { index, getCartByUser } from '../controllers/cartController.js';  // Perhatikan ekstensi .js

const router = express.Router()
router.get('/', index)
router.get('/user/:user_id', getCartByUser)

export default router