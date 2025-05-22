import express from 'express'
import { createInvoice, getInvoice, invoiceWebhook } from '../controllers/paymentController.js'

const router = express.Router()

router.post('/v2/invoices/', createInvoice)
router.get('/v2/invoices', getInvoice)
router.post('/invoicewebhook', invoiceWebhook)
export default router