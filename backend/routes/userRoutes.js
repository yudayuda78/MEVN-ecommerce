import express from 'express'
import {index, register} from '../controllers/userController.js'

const router = express.Router()


router.post('/register', register)
router.get('/', index)


export default router
