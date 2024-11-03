import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const commentId = searchParams.get("commentId");
  try {
    const cookieStore = cookies();
    const accessToken = cookieStore.get("Authorization")?.value;

    if (!commentId) {
      return NextResponse.json(
        { error: "Post ID is required" },
        { status: 400 }
      );
    }

    const response = await fetch(
      `${process.env.API_URL}/user/comment/${commentId}`,
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
      throw new Error(`Failed to delete Comment: ${errorMessage}`);
    }

    return NextResponse.json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting Comment:", error);
    return NextResponse.json(
      { error: "Failed to delete the Comment" },
      { status: 500 }
    );
  }
}
