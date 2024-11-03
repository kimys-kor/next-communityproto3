import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page");
  const size = searchParams.get("size");

  try {
    const response = await fetch(
      process.env.API_URL + `/guest/partnerList?page=${page}&size=${size}`,
      {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch partner board list");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching partner board list:", error);
    return NextResponse.json(
      { error: "Failed to fetch partner board list" },
      { status: 500 }
    );
  }
}
