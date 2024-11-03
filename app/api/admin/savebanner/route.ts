import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const cookieStore = cookies();
    const accessToken = cookieStore.get("Authorization")?.value;

    const { partnerName, thumbNail, partnerUrl } = await request.json();

    if (!partnerName || !thumbNail || !partnerUrl) {
      return NextResponse.json(
        { error: "Partner name and url are required." },
        { status: 400 }
      );
    }

    const response = await fetch(`${process.env.API_URL}/admin/saveBanner`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
      body: JSON.stringify({ partnerName, thumbNail, partnerUrl }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Backend error response:", errorText);
      return NextResponse.json(
        { error: "Failed to save banner in backend." },
        { status: response.status }
      );
    }

    const result = await response.json();
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error saving banner:", error);
    return NextResponse.json(
      { error: "Internal server error while saving banner." },
      { status: 500 }
    );
  }
}
