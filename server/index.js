import 'dotenv/config';
import crypto from 'node:crypto';
import express from 'express';
import cors from 'cors';
import { saveOrder } from './orderStore.js';
import { sendOrderNotification } from './email.js';
import { validateOrderPayload } from './validation.js';

const app = express();
const port = process.env.PORT || 5000;
const clientOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

app.use(cors({ origin: clientOrigin }));
app.use(express.json({ limit: '100kb' }));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.post('/api/orders', async (req, res) => {
  try {
    const validation = validateOrderPayload(req.body);

    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        message: 'Please check the required checkout fields.',
        errors: validation.errors,
      });
    }

    const order = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      ...validation.orderData,
    };

    await saveOrder(order);

    try {
      await sendOrderNotification(order);
    } catch (error) {
      console.error('Order notification email failed:', error);
    }

    return res.status(201).json({
      success: true,
      message: 'Order Confirmed Successfully',
      orderId: order.id,
      order,
    });
  } catch (error) {
    console.error('Order processing failed:', error);
    return res.status(500).json({
      success: false,
      message: 'Unable to process order. Please try again.',
    });
  }
});

app.listen(port, () => {
  console.log(`Order API listening on port ${port}`);
});
