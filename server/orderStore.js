import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, 'data');
const ordersFile = path.join(dataDir, 'orders.json');

async function readOrders() {
  try {
    const contents = await readFile(ordersFile, 'utf8');
    return JSON.parse(contents);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

export async function saveOrder(order) {
  await mkdir(dataDir, { recursive: true });
  const orders = await readOrders();
  orders.push(order);
  await writeFile(ordersFile, JSON.stringify(orders, null, 2));
  return order;
}
