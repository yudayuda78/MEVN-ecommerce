import express from 'express'
import { addAdmin,loginAdmin, getAdmin, getProduct, addProduct, deleteProduct, increaseProduct, decreaseProduct } from '../controllers/adminController.js'
import { adminMiddleware } from '../middleware/adminMiddleware.js'


const router = express.Router()
router.post('/addAdmin', addAdmin)
router.post('/loginAdmin', loginAdmin)
router.get('/getAdmin', adminMiddleware, getAdmin)
router.get('/getProduct', getProduct)
router.post('/addProduct', addProduct)
router.post('/deleteProduct', deleteProduct)
router.patch('/increaseProduct', increaseProduct )
router.patch('/decreaseProduct', decreaseProduct)

export default router