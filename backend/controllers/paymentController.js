import { Xendit } from 'xendit-node';

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
        console.log('RESPONSE:', response)
        res.json({ invoice_url: response.invoiceUrl });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
