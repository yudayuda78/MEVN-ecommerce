import express from 'express'
import {index, show} from '../controllers/productController.js'

const router = express.Router()

router.get('/', index)
router.get('/:id', show)

export default router
