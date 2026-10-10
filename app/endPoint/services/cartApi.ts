const BASE_URL = "https://ecommerce.routemisr.com/api/v1";

export async function addToCart(productId: string, token: string) {
  const response = await fetch(`${BASE_URL}/cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token,
    },
    body: JSON.stringify({
      productId,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || "Failed to add product to cart");
  }

  return data;
}
