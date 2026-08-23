import nodemailer from 'nodemailer';

const ORDER_NOTIFICATION_RECIPIENT = 'elasarapushanmukhasai@gmail.com';
const BRAND_NAME = 'Palleturi Ruchulu';

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function formatCurrency(value) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(value));
}

function buildOrderEmail(order) {
  const rows = order.items
    .map(
      (item) => `
        <tr>
          <td>${escapeHtml(item.title)}</td>
          <td align="right">${item.quantity}</td>
          <td align="right">${formatCurrency(item.price)}</td>
          <td align="right">${formatCurrency(item.lineTotal)}</td>
        </tr>
      `,
    )
    .join('');

  return `
    <h2>New Order Received</h2>
    <p><strong>Order ID:</strong> ${escapeHtml(order.id)}</p>
    <p><strong>Order Date and Time:</strong> ${escapeHtml(order.createdAt)}</p>
    <h3>Customer Details</h3>
    <p>
      <strong>Name:</strong> ${escapeHtml(order.customer.fullName)}<br>
      <strong>Email:</strong> ${escapeHtml(order.customer.email)}<br>
      <strong>Phone:</strong> ${escapeHtml(order.customer.phone)}<br>
      <strong>Delivery Address:</strong> ${escapeHtml(order.customer.address)}, ${escapeHtml(order.customer.city)}, ${escapeHtml(order.customer.zip)}
    </p>
    <h3>Ordered Items</h3>
    <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse;">
      <thead>
        <tr>
          <th align="left">Item</th>
          <th align="right">Quantity</th>
          <th align="right">Price</th>
          <th align="right">Line Total</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
    <p>
      <strong>Subtotal:</strong> ${formatCurrency(order.totals.subtotal)}<br>
      <strong>Shipping:</strong> ${formatCurrency(order.totals.shipping)}<br>
      <strong>Tax:</strong> ${formatCurrency(order.totals.tax)}<br>
      <strong>Total Amount:</strong> ${formatCurrency(order.totals.total)}
    </p>
  `;
}

export async function sendOrderNotification(order) {
  const requiredEnv = ['EMAIL_HOST', 'EMAIL_PORT', 'EMAIL_USER', 'EMAIL_PASS'];
  const missing = requiredEnv.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(`Missing email environment variables: ${missing.join(', ')}`);
  }

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: Number(process.env.EMAIL_PORT) === 465,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"${BRAND_NAME} Orders" <${process.env.EMAIL_USER}>`,
    to: ORDER_NOTIFICATION_RECIPIENT,
    subject: `New ${BRAND_NAME} order ${order.id}`,
    html: buildOrderEmail(order),
  });
}
