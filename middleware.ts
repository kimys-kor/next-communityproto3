import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

function isTokenExpiringSoon(accessToken: string): boolean {
  try {
    const tokenPayload = JSON.parse(
      Buffer.from(accessToken.split(".")[1], "base64").toString()
    );

    if (!tokenPayload.exp) {
      console.warn("Token does not contain an expiration field.");
      return false;
    }

    const expirationTime = tokenPayload.exp * 1000; // Convert to milliseconds
    const currentTime = Date.now();
    const timeUntilExpiration = expirationTime - currentTime;

    return timeUntilExpiration <= 7200 * 60 * 1000;
  } catch (error) {
    console.error("Error decoding access token:", error);
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", request.nextUrl.pathname);

  const cookieValues = await getCookie();
  if (!cookieValues) return NextResponse.next();

  const accessToken = cookieValues["Authorization"]?.replace("Bearer ", "");
  const refreshToken = cookieValues["refresh_token"];

  // If accessToken or refreshToken is missing or if the token is not expiring soon, skip refresh
  if (!isTokenExpiringSoon(accessToken)) {
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  if (!accessToken || !refreshToken) {
    console.warn("Missing access token or refresh token.");
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  // Attempt to refresh the token
  try {
    const response = await fetch(`${process.env.API_URL}/user/refresh`, {
      method: "GET",
      credentials: "include",
      headers: {
        Cookie: `refresh_token=${refreshToken}`,
      },
    });

    if (!response.ok) {
      console.error(
        "Failed to refresh user data:",
        response.status,
        response.statusText
      );
      const errorDetails = await response.json();
      console.error("Error details:", errorDetails);
      throw new Error(`Failed to refresh user data: ${response.status}`);
    }

    const { data } = await response.json();
    // Optionally update headers or cookies based on refreshed tokens

    return NextResponse.next({ request: { headers: requestHeaders } });
  } catch (error) {
    console.error("Error refreshing user data:", error);
    return NextResponse.next({ request: { headers: requestHeaders } });
  }
}

export const config = {
  matcher: [
    "/",
    "/protectedadmins/:path*",
    "/partner/:path*",
    "/sport/:path*",
    "/community/:path*",
    "/event/:path*",
    "/promotion/:path*",
    "/customer/:path*",
  ],
};

export async function getCookie() {
  const cookieStore = cookies();
  const allCookies = cookieStore.getAll();

  if (!allCookies || allCookies.length === 0) {
    return null;
  }

  const cookieMap = Object.fromEntries(
    allCookies.map((cookie) => [cookie.name, cookie.value])
  );

  return cookieMap;
}
