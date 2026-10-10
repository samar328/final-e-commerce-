export async function getAllBrands() {
  const response = await fetch('https://ecommerce.routemisr.com/api/v1/brands', {
    next: { revalidate: 60 } 
  });
  if (!response.ok) throw new Error('Failed to fetch brands');
  
  const data = await response.json();
  return data;
}

export async function getSpecificBrand(id: string) {
  const response = await fetch(`https://ecommerce.routemisr.com/api/v1/brands/${id}`);
  if (!response.ok) throw new Error('Failed to fetch brand details');

  const data = await response.json();
  return data;
}