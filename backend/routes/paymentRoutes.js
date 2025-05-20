import express from 'express'
import { createInvoice } from '../controllers/paymentController.js'

const router = express.Router()

router.post('/v2/invoices/', createInvoice)
export default router