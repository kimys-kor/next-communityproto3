import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const period = searchParams.get("period");
  const page = searchParams.get("page");
  const size = searchParams.get("size");

  try {
    const response = await fetch(
      process.env.API_URL +
        `/guest/bestList?period=${period}&page=${page}&size=${size}`,
      {
        method: "GET",
        credentials: "include",
        // next: { revalidate: 300 },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch best board list");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching best board list:", error);
    return NextResponse.json(
      { error: "Failed to fetch best board list" },
      { status: 500 }
    );
  }
}
