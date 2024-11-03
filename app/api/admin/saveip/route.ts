import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const cookieStore = cookies();
    const accessToken = cookieStore.get("Authorization")?.value;

    const { ipAddress } = await request.json();

    const response = await fetch(`${process.env.API_URL}/admin/add/ip`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(accessToken && { Authorization: `${accessToken}` }),
      },
      credentials: "include",
      body: JSON.stringify({
        type: "blocked",
        ipAddress,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Backend error response:", errorText);
      return NextResponse.json(
        { error: "Failed to delete posts in backend." },
        { status: response.status }
      );
    }

    const result = await response.json();
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error deleting posts:", error);
    return NextResponse.json(
      { error: "Internal server error while deleting posts." },
      { status: 500 }
    );
  }
}
