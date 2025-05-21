import express from 'express'
import { createInvoice, getInvoice } from '../controllers/paymentController.js'

const router = express.Router()

router.post('/v2/invoices/', createInvoice)
router.get('/v2/invoices', getInvoice)
export default router