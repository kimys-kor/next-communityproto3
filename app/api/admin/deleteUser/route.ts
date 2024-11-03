import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function PUT(request: Request) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("Authorization")?.value;

  if (!accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { idList } = await request.json();
    if (!idList || idList.length === 0) {
      return NextResponse.json(
        { error: "No users selected for blocking" },
        { status: 400 }
      );
    }

    const response = await fetch(`${process.env.API_URL}/admin/set/block`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ idList: idList }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Failed to block users:", errorText);
      return NextResponse.json(
        { error: "Failed to block users" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in block request:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
