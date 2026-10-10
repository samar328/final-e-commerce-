import { Category, productType } from "../types/productType";

// 1. Get All Products
export async function getAllProduct(): Promise<productType[]> {
  try {
    const response = await fetch("https://ecommerce.routemisr.com/api/v1/products", {
      next: { revalidate: 60 },
    });

    if (!response.ok) throw new Error("API Error");

    const payload = await response.json();
    return payload.data;
  } catch (error) {
    console.error("Fetch Error:", error);
    throw new Error("Failed to fetch products");
  }
}

// 2. Get Single Product Details
export async function getProductDetails(
  productId: string
): Promise<productType> {
  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products/${productId}`,
      {
        next: { revalidate: 60 },
      }
    );

    if (!response.ok) throw new Error("API Error");

    const payload = await response.json();
    return payload.data;
  } catch (error) {
    console.error("Fetch Error:", error);
    throw new Error("Failed to fetch product details");
  }
}

// 3. Get All Categories
export async function getShopCategories(): Promise<Category[]> {
  try {
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/categories",
      {
        next: { revalidate: 60 },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Categories API failed: ${response.status} ${response.statusText}`
      );
    }

    const payload = await response.json();
    return payload.data;
  } catch (error) {
    console.error("REAL API ERROR:", error);
    throw error;
  }
}