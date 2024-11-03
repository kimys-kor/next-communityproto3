import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  try {
    const requestBody = await request.json();

    const cookieStore = cookies();
    const accessToken = cookieStore.get("Authorization")?.value;

    if (
      !requestBody.phoneNum ||
      !requestBody.fullName ||
      !requestBody.nickname
    ) {
      console.error("Missing required fields in request body:", requestBody);
      return NextResponse.json(
        { error: "Missing required fields: phoneNum, fullName, nickname" },
        { status: 400 }
      );
    }

    const response = await fetch(`${process.env.API_URL}/user/update/myinfo`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${accessToken}`,
      },
      body: JSON.stringify({
        phoneNum: requestBody.phoneNum,
        fullName: requestBody.fullName,
        nickname: requestBody.nickname,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Failed to update user info:", errorText);
      return NextResponse.json(
        { error: "Failed to update user info on the server" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error updating user info:", error);
    return NextResponse.json(
      { error: "An error occurred while updating user info" },
      { status: 500 }
    );
  }
}
