import express from 'express'
import { createInvoice } from '../controllers/paymentController.js'

const router = express.Router()

router.post('/create-invoice', createInvoice)
export default router