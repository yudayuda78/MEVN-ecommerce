import express from 'express'
import {index, register, login, profile} from '../controllers/userController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'

const router = express.Router()


router.post('/register', register)
router.get('/', index)
router.post('/login', login)
router.get('/profile', authMiddleware, profile)


export default router
