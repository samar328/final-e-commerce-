import { getSpecificBrand } from "@/app/endPoint/services/brandsApi";
import Image from "next/image";

interface Props {
  params: { id: string };
}

export default async function BrandDetailsPage({ params }: Props) {
  const { id } = params;
  const { data: brand } = await getSpecificBrand(id);

  return (
    <div className="container mx-auto py-12 px-4 flex flex-col items-center">
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 max-w-md w-full text-center">
        <div className="relative h-40 w-full mb-6 flex justify-center items-center">
          <Image
            src={brand.image}
            alt={brand.name}
            width={200}
            height={160}
            className="object-contain"
          />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{brand.name}</h1>
        <p className="text-gray-500">{brand.slug}</p>
      </div>
    </div>
  );
}