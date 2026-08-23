import { products } from './products.js';

const productMap = new Map(products.map((product) => [product.id, product]));
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[+()\d\s-]{7,20}$/;
const FREE_SHIPPING_MINIMUM = 499;
const SHIPPING_FEE = 50;

function cleanString(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function roundMoney(value) {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function validateOrderPayload(body) {
  const errors = {};
  const customer = body?.customer ?? {};
  const fullName = cleanString(customer.fullName);
  const email = cleanString(customer.email).toLowerCase();
  const phone = cleanString(customer.phone);
  const address = cleanString(customer.address);
  const city = cleanString(customer.city);
  const zip = cleanString(customer.zip);
  const items = Array.isArray(body?.items) ? body.items : [];

  if (fullName.length < 2) errors.fullName = 'Full name is required.';
  if (!emailPattern.test(email)) errors.email = 'A valid email is required.';
  if (!phonePattern.test(phone)) errors.phone = 'A valid phone number is required.';
  if (address.length < 8) errors.address = 'Full delivery address is required.';
  if (city.length < 2) errors.city = 'City is required.';
  if (zip.length < 3) errors.zip = 'ZIP code is required.';
  if (items.length === 0) errors.items = 'Cart cannot be empty.';

  const normalizedItems = [];

  for (const item of items) {
    const id = Number(item?.id);
    const quantity = Number(item?.quantity);
    const product = productMap.get(id);

    if (!product || !Number.isInteger(quantity) || quantity < 1 || quantity > 99) {
      errors.items = 'Cart contains an invalid item or quantity.';
      break;
    }

    normalizedItems.push({
      id: product.id,
      title: product.title,
      price: product.price,
      quantity,
      lineTotal: roundMoney(product.price * quantity),
    });
  }

  if (Object.keys(errors).length > 0) {
    return { valid: false, errors };
  }

  const subtotal = roundMoney(normalizedItems.reduce((sum, item) => sum + item.lineTotal, 0));
  const shipping = subtotal >= FREE_SHIPPING_MINIMUM ? 0 : SHIPPING_FEE;
  const tax = roundMoney((subtotal + shipping) * 0.08);
  const total = roundMoney(subtotal + shipping + tax);

  return {
    valid: true,
    orderData: {
      customer: { fullName, email, phone, address, city, zip },
      items: normalizedItems,
      totals: { subtotal, shipping, tax, total },
    },
  };
}
