import express from 'express'
import { addAdmin,loginAdmin, getAdmin, getProduct, addProduct, deleteProduct, increaseProduct, decreaseProduct, editProduct} from '../controllers/adminController.js'
import { adminMiddleware } from '../middleware/adminMiddleware.js'
import { uploadImages } from '../middleware/uploadMiddleware.js'


const router = express.Router()
router.post('/addAdmin', addAdmin)
router.post('/loginAdmin', loginAdmin)
router.get('/getAdmin', adminMiddleware, getAdmin)
router.get('/getProduct', getProduct)
router.post('/addProduct', uploadImages, addProduct)
router.post('/deleteProduct', deleteProduct)
router.patch('/increaseProduct', increaseProduct )
router.patch('/decreaseProduct', decreaseProduct)
router.patch('/editProduct', uploadImages,editProduct)

export default router