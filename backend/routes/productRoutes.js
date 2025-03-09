import express from 'express'
import {index, woman, man} from '../controllers/productController.js'

const router = express.Router()

router.get('/', index)
router.get('/man', man)
router.get('/woman', woman)

export default router
