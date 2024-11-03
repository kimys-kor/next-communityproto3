import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const boardId = searchParams.get("boardId");
  const page = searchParams.get("page");
  const size = searchParams.get("size");

  try {
    const response = await fetch(
      process.env.API_URL +
        `/guest/list/comment?boardId=${boardId}&page=${page}&size=${size}`,
      {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch comment list");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching comment list:", error);
    return NextResponse.json(
      { error: "Failed to fetch comment list" },
      { status: 500 }
    );
  }
}
