import express from 'express'
import {index, woman} from '../controllers/productController.js'

const router = express.Router()

router.get('/', index)
router.get('/woman', woman)

export default router
