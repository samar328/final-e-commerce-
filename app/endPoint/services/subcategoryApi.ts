export async function getAllSubCategories() {
  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/subcategories?limit=10"
  );

  if (!response.ok) {
    throw new Error("Failed to fetch subcategories");
  }

  const payload = await response.json();

  return payload.data;
}

export async function getSubCategoryById(subCategoryId: string) {
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/subcategories/${subCategoryId}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch subcategory");
  }

  const payload = await response.json();

  return payload.data;
}

export async function getSubCategoriesByCategory(categoryId: string) {
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch subcategories");
  }

  const payload = await response.json();

  return payload.data;
}

