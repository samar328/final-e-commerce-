export interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
}

const BASE_URL = 'https://ecommerce.routemisr.com/api/v1/orders';

export async function createCheckoutSession(
  cartId: string, 
  shippingAddress: ShippingAddress
) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('userToken') : '';
  const domainUrl = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';

  try {
    const res = await fetch(`${BASE_URL}/checkout-session/${cartId}?url=${domainUrl}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'token': token || '',
      },
      body: JSON.stringify({ shippingAddress }),
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
}

export async function getUserOrders(userId: string) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('userToken') : '';

  try {
    const res = await fetch(`${BASE_URL}/user/${userId}`, {
      headers: {
        'token': token || '',
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching user orders:', error);
    throw error;
  }
}