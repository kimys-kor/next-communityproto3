import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const typ = searchParams.get("typ");
  const keyword = searchParams.get("keyword");
  const page = searchParams.get("page");
  const size = searchParams.get("size");

  try {
    const response = await fetch(
      process.env.API_URL +
        `/guest/photoList?postType=${typ}&keyword=${keyword}&page=${page}&size=${size}`,
      {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch board list");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching board list:", error);
    return NextResponse.json(
      { error: "Failed to fetch board list" },
      { status: 500 }
    );
  }
}
