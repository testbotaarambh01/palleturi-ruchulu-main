const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export async function submitOrder(orderPayload) {
  let response;

  try {
    response = await fetch(`${API_BASE_URL}/api/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderPayload),
    });
  } catch {
    throw new Error('Order server is not reachable. Please start the backend with npm run server or use npm run dev:full.');
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok || !data.success) {
    const error = new Error(data.message || 'Unable to place order. Please try again.');
    error.details = data.errors || {};
    throw error;
  }

  return data;
}
