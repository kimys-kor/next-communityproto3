import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const cookieStore = cookies();
    const accessToken = cookieStore.get("Authorization")?.value;
    const { username, password, fullName, phoneNum, nickname } =
      await request.json();

    // Basic validation (you could expand this as needed)
    if (!username || !password || !fullName || !phoneNum || !nickname) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // Send the data to the actual API endpoint
    const response = await fetch(`${process.env.API_URL}/master/saveAdmin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${accessToken}`,
      },
      body: JSON.stringify({
        username,
        password,
        fullName,
        phoneNum,
        nickname,
      }),
    });

    // Check if the response from the backend API was successful
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error from backend:", errorData);
      return NextResponse.json(
        { message: "Failed to save admin user", error: errorData },
        { status: response.status }
      );
    }

    // Return a success response
    const data = await response.json();
    return NextResponse.json(
      { message: "Admin user created successfully", data },
      { status: 201 }
    );
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { message: "Server error occurred while saving admin user" },
      { status: 500 }
    );
  }
}
