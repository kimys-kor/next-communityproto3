import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const boardId = searchParams.get("boardId");
  try {
    const cookieStore = cookies();
    const accessToken = cookieStore.get("Authorization")?.value;

    if (!boardId) {
      return NextResponse.json(
        { error: "Post ID is required" },
        { status: 400 }
      );
    }

    const response = await fetch(
      `${process.env.API_URL}/user/post/${boardId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...(accessToken && { Authorization: `${accessToken}` }),
        },
        credentials: "include",
      }
    );

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Failed to delete post: ${errorMessage}`);
    }

    return NextResponse.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json(
      { error: "Failed to delete the post" },
      { status: 500 }
    );
  }
}
