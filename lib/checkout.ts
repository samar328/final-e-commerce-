export async function handleCheckout(cartId: string, shippingAddress: { details: string; phone: string; city: string }) {
  const token = localStorage.getItem("userToken"); 

  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${window.location.origin}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token || "",
      },
      body: JSON.stringify({ shippingAddress }),
    });

    const data = await res.json();

    if (data.status === "success" && data.session?.url) {
      window.location.href = data.session.url;
    } else {
      console.error("Checkout Failed:", data);
    }
  } catch (error) {
    console.error("Error initiating checkout:", error);
  }
}