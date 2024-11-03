import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page");
  const size = searchParams.get("size");

  try {
    const response = await fetch(
      process.env.API_URL + `/guest/newList?page=${page}&size=${size}`,
      {
        method: "GET",
        credentials: "include",
        // next: { revalidate: 300 },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch new board list");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching new board list:", error);
    return NextResponse.json(
      { error: "Failed to fetch new board list" },
      { status: 500 }
    );
  }
}
