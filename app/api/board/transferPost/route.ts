import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function PUT(request: Request) {
  try {
    const cookieStore = cookies();
    const accessToken = cookieStore.get("Authorization")?.value;

    const { idList, postType } = await request.json();

    if (
      !idList ||
      !Array.isArray(idList) ||
      idList.length === 0 ||
      postType == null
    ) {
      return NextResponse.json(
        { error: "Invalid postType or empty idList provided." },
        { status: 400 }
      );
    }

    const response = await fetch(
      `${process.env.API_URL}/admin/transfer/postlist`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(accessToken && { Authorization: `${accessToken}` }),
        },
        credentials: "include",
        body: JSON.stringify({ postType, idList }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Backend error response:", errorText);
      return NextResponse.json(
        { error: "Failed to transfer posts in backend." },
        { status: response.status }
      );
    }

    const result = await response.json();
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error transferring posts:", error);
    return NextResponse.json(
      { error: "Internal server error while transferring posts." },
      { status: 500 }
    );
  }
}
