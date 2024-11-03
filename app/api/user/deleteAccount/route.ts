import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
  try {
    const requestBody = await request.json();

    const cookieStore = cookies();
    const accessToken = cookieStore.get("Authorization")?.value;

    if (!requestBody.password) {
      console.error("Missing required field: password", requestBody);
      return NextResponse.json(
        { error: "Missing required field: password" },
        { status: 400 }
      );
    }

    const response = await fetch(
      `${process.env.API_URL}/user/update/withdrawl`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${accessToken}`,
        },
        body: JSON.stringify({
          password: requestBody.password,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Failed to delete account:", errorText);
      return NextResponse.json(
        { error: "Failed to delete account on the server" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error processing delete account request:", error);
    return NextResponse.json(
      {
        error: "An error occurred while processing the delete account request",
      },
      { status: 500 }
    );
  }
}
