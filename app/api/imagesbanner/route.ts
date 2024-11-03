import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("Authorization")?.value;

  console.log("실행행실행행실행행실행행");
  try {
    const formData = await request.formData();

    const uploadFormData = new FormData();

    formData.forEach((value, key) => {
      if (value instanceof Blob) {
        uploadFormData.append("files", value, (value as File).name);
      }
    });

    const response = await fetch(process.env.API_URL + "/admin/upload/banner", {
      method: "POST",
      body: uploadFormData,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log("Spring response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error from Spring API:", errorText);
      throw new Error(
        `Failed to upload files to the Spring API: ${response.statusText}`
      );
    }

    const responseData = await response.json();

    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Error uploading images:", error);
    return NextResponse.json(
      { error: "Failed to upload images" },
      { status: 500 }
    );
  }
}
