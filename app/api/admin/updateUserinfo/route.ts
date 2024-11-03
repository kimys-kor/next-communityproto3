import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function PATCH(request: NextRequest) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("Authorization")?.value;

  if (!accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const item = await request.json();

    const response = await fetch(
      `${process.env.API_URL}/admin/update/userinfo`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(item),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Failed to update user:", errorText);
      return NextResponse.json(
        { error: "Failed to update user" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in update user request:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
