import express from 'express'
import { addProduct, deleteProduct } from '../controllers/adminController.js'

const router = express.Router()
router.post('/addProduct', addProduct)
router.post('/decreaseProduct', deleteProduct)

export default router