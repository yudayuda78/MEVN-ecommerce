import express from 'express'
import { addAdmin,loginAdmin, addProduct, deleteProduct, increaseProduct, decreaseProduct } from '../controllers/adminController.js'

const router = express.Router()
router.post('/addAdmin', addAdmin)
router.post('/loginAdmin', loginAdmin)
router.post('/addProduct', addProduct)
router.post('/deleteProduct', deleteProduct)
router.patch('/increaseProduct', increaseProduct )
router.patch('/decreaseProduct', decreaseProduct)

export default router