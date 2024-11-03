import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const keyword = searchParams.get("keyword");
  const page = searchParams.get("page");
  const size = searchParams.get("size");

  const cookieStore = cookies();
  const accessToken = cookieStore.get("Authorization")?.value;

  try {
    const response = await fetch(
      process.env.API_URL +
        `/admin/user/findall?keyword=${keyword}&page=${page}&size=${size}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${accessToken}`,
        },
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
