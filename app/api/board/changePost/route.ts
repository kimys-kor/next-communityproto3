import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
  try {
    const cookieStore = cookies();
    const accessToken = cookieStore.get("Authorization")?.value;
    const body = await request.json();

    const { postId, title, content, thumbNail } = body;
    if (!postId || !title || !content) {
      return NextResponse.json(
        { error: "Missing required fields: postId, title, content" },
        { status: 400 }
      );
    }

    const response = await fetch(`${process.env.API_URL}/user/update/post`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ postId, title, content, thumbNail }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Failed to update post:", errorText);
      return NextResponse.json(
        { error: "Failed to update post on the server" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "An error occurred while processing the request" },
      { status: 500 }
    );
  }
}
