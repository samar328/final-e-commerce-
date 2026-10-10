const CART_API_URL = "https://ecommerce.routemisr.com/api/v2";
const API_URL = "https://ecommerce.routemisr.com/api/v1";

export type CartProduct = {
  _id: string;
  title: string;
  price: number;
  imageCover: string;
  category?: {
    name: string;
  };
};

export type CartItem = {
  count: number;
  price: number;
  product: CartProduct;
};

export type Cart = {
  _id: string;
  cartOwner?: string;
  products: CartItem[];
  totalCartPrice: number;
  numOfCartItems: number;
};

async function request(
  baseUrl: string,
  endpoint: string,
  token: string,
  options: RequestInit = {}
) {
  const headers = new Headers(options.headers);

  headers.set("Content-Type", "application/json");
  headers.set("token", token);

  const res = await fetch(`${baseUrl}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.message || "Something went wrong");
  }

  return data;
}

// =========================
// GET CART
// =========================
export async function getCart(token: string): Promise<Cart | null> {
  const data = await request(CART_API_URL, "/cart", token);

  return data?.data ?? data ?? null;
}

// =========================
// ADD PRODUCT TO CART
// =========================
export async function addToCart(
  productId: string,
  token: string
) {
  return request(CART_API_URL, "/cart", token, {
    method: "POST",
    body: JSON.stringify({
      productId,
    }),
  });
}

// =========================
// UPDATE QUANTITY
// =========================
export async function updateCartItem(
  productId: string,
  count: number,
  token: string
) {
  return request(
    CART_API_URL,
    `/cart/${productId}`,
    token,
    {
      method: "PUT",
      body: JSON.stringify({
        count,
      }),
    }
  );
}

// =========================
// DELETE PRODUCT
// =========================
export async function removeFromCart(
  productId: string,
  token: string
) {
  return request(
    CART_API_URL,
    `/cart/${productId}`,
    token,
    {
      method: "DELETE",
    }
  );
}

// =========================
// CLEAR CART
// =========================
export async function clearCart(token: string) {
  return request(CART_API_URL, "/cart", token, {
    method: "DELETE",
  });
}

// =========================
// CHECKOUT
// =========================
export async function checkout(
  cartId: string,
  shippingAddress: {
    details: string;
    phone: string;
    city: string;
  },
  token: string
) {
  const baseUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : "";

  const params = new URLSearchParams({
    url: baseUrl,
  });

  const res = await fetch(
    `${API_URL}/orders/checkout-session/${cartId}?${params.toString()}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token,
      },
      body: JSON.stringify({
        shippingAddress,
      }),
    }
  );

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(
      data?.message || "Checkout failed"
    );
  }

  return data;
}