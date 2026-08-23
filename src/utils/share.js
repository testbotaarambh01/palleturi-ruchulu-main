export async function shareProduct(product) {
  const url = `${window.location.origin}/products/${product.id}`;
  const shareData = {
    title: product.title,
    text: product.description,
    url,
  };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
      return { success: true, method: 'share' };
    } catch (err) {
      if (err.name === 'AbortError') return { success: false, method: 'cancelled' };
    }
  }

  try {
    await navigator.clipboard.writeText(url);
    return { success: true, method: 'clipboard' };
  } catch {
    return { success: false, method: 'failed' };
  }
}
