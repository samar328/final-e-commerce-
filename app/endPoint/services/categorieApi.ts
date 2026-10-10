export async function getAllCategories() {
  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/categories"
  );

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  const payload = await response.json();

  return payload.data;
}



