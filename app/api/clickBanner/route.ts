import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const bannerId = searchParams.get("bannerId");

  if (!bannerId) {
    return NextResponse.json(
      { error: "Banner ID is required" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `${process.env.API_URL}/guest/clickBanner?bannerId=${bannerId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Backend error response:", errorText);
      return NextResponse.json(
        { error: "Failed to fetch banner data from backend" },
        { status: response.status }
      );
    }

    const result = await response.json();
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error fetching banner data:", error);
    return NextResponse.json(
      { error: "Internal server error while fetching banner data" },
      { status: 500 }
    );
  }
}
