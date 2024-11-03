import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("Authorization")?.value;

  if (!accessToken) {
    return NextResponse.json(
      { error: "Authorization token is missing" },
      { status: 401 }
    );
  }

  try {
    // Parse the request body to extract the update banner data
    const { id, partnerName, thumbNail, partnerUrl } = await request.json();

    // Check for any missing fields
    if (!id || !partnerName || !thumbNail || !partnerUrl) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: id, partnerName, thumbNail, or partnerUrl",
        },
        { status: 400 }
      );
    }

    // Prepare the data for the backend API
    const updateBannerDto = {
      id,
      partnerName,
      thumbNail,
      partnerUrl,
    };

    // Call the Spring backend API to update the banner
    const response = await fetch(`${process.env.API_URL}/admin/update/banner`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(updateBannerDto),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Backend error response:", errorText);
      return NextResponse.json(
        { error: "Failed to update banner in backend." },
        { status: response.status }
      );
    }

    // Return a successful response
    const result = await response.json();
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error updating banner:", error);
    return NextResponse.json(
      { error: "Internal server error while updating banner." },
      { status: 500 }
    );
  }
}
