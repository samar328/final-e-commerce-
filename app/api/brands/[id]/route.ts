import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/brands/${id}`);
    
    if (!response.ok) {
      return NextResponse.json(
        { message: "Failed to fetch brand" },
        { status: response.status }
      );
    }

    const payload = await response.json();
    return NextResponse.json(payload);

  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}