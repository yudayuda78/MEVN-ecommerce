import express from 'express'
import {index, register, login, getUser,logout, editprofile} from '../controllers/userController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'

const router = express.Router()


router.post('/register', register)
router.get('/', index)
router.post('/login', login)
router.get('/getUser', authMiddleware, getUser)
router.post('/logout', authMiddleware, logout)
router.put('/editprofile', authMiddleware, editprofile)


export default router
