import { Xendit, Invoice as InvoiceClient } from 'xendit-node'


const xenditClient = new Xendit({secretKey: xnd_development_bawL3hfJhbcOOrCXF6MScl1w0Gy0hcFbqPW1CqmFi8qxsm1GnOs26QuAW1uWghQT})
const { Invoice } = xenditClient

const xenditInvoiceClient = new InvoiceClient({secretKey: xnd_development_bawL3hfJhbcOOrCXF6MScl1w0Gy0hcFbqPW1CqmFi8qxsm1GnOs26QuAW1uWghQT})



export const createInvoice = async (req, res) => {
  console.log('BODY:', req.body);
  const { name, email, amount } = req.body;

  try {
    const response = await invoice.createInvoice({
      externalID: `invoice-${Date.now()}`,
      payerEmail: email,
      description: `Pembayaran dari ${name}`,
      amount,
    });

    res.json({ invoice_url: response.invoice_url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
