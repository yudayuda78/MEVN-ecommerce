import { Xendit } from 'xendit-node';
import Order from "../models/Order.js"

const xenditClient = new Xendit({ secretKey: 'xnd_development_bawL3hfJhbcOOrCXF6MScl1w0Gy0hcFbqPW1CqmFi8qxsm1GnOs26QuAW1uWghQT' });
const { Invoice } = xenditClient


export const createInvoice = async (req, res) => {
    const { name, email, items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Items must be a non-empty array' });
    }
  
 
    const amount = items.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);

    try {
        const response = await Invoice.createInvoice({
        data: {
            amount: amount,
            externalId: `invoice-${Date.now()}`,
            payerEmail: email,
            description: `Pembayaran dari ${name}`,
            currency: 'IDR',
            invoiceDuration: 86400,
            reminderTime: 1,
            items: items,
        }
        });
        // console.log('RESPONSE:', response)
        res.json({ invoice_url: response.invoiceUrl });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


export const getInvoice = async(req, res) => {
    try {
        const invoices = await Invoice.getInvoices()
        res.json(invoices)
    }catch (error) {
        console.error('Error fetching invoice:', error)
        res.status(500).json({ error: error.message })
      }
}

export const invoiceWebhook = async(req, res) => {
    const xCallbackToken = req.header('X-CALLBACK-TOKEN');
    console.log(xCallbackToken)
    const expectedToken = process.env.X_CALLBACK_TOKEN
  
    
    if (xCallbackToken !== expectedToken) {
      return res.status(403).json({ message: 'Unauthorized callback token' });
    }
  
    const data = req.body;
    console.log(data)
  
    
    if (data.status === 'PAID') {
        await Order.updateOne(
            { external_id: data.external_id },
            { status: 'paid' }
          );
    }
  
    return res.status(200).json({ message: 'Webhook received successfully' });
}