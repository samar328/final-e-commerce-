const BASE_URL =
  process.env.NEXTAUTH_API ||
  "https://ecommerce.routemisr.com/api/v1";

export async function getWishlist(token: string) {
  const response = await fetch(`${BASE_URL}/wishlist`, {
    method: "GET",
    headers: {
      token,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to get wishlist");
  }

  const payload = await response.json();

  return payload.data;
}

export async function addToWishlist(
  productId: string,
  token: string
) {
  const response = await fetch(`${BASE_URL}/wishlist`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token,
    },
    body: JSON.stringify({
      productId,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to add product to wishlist");
  }

  return response.json();
}

export async function removeFromWishlist(
  productId: string,
  token: string
) {
  const response = await fetch(
    `${BASE_URL}/wishlist/${productId}`,
    {
      method: "DELETE",
      headers: {
        token,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to remove product from wishlist");
  }

  return response.json();
}