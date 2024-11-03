import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const boardId = searchParams.get("boardId");

  try {
    const response = await fetch(
      process.env.API_URL + `/guest/content?boardId${boardId}`,
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
