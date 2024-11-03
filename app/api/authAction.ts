"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { savePostRequest, CommentRequest } from "@/app/types";

export async function refreshUser() {
  const tokens = await getCookie();
  if (!tokens) return null;

  const { accessToken, refreshToken } = tokens;

  try {
    const response = await fetch(`${process.env.API_URL}/user/myinfo`, {
      method: "GET",
      credentials: "include",
      headers: {
        ...(accessToken && { Authorization: accessToken }),
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
    return data;
  } catch (error) {
    console.error("Error refreshing user data:");
    return null;
  }
}

export const commentSaveServerAction = async (data: CommentRequest) => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("Authorization")?.value;

  if (!accessToken) {
    console.error("Authorization token is missing from cookies.");
    return { status: "ERROR", message: "Authorization token is missing." };
  }

  try {
    const response = await fetch(`${process.env.API_URL}/user/write/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Failed to submit comment. Status:", response.status);
      console.error("Response body:", errorText);
      throw new Error("Failed to submit comment");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error in commentSaveServerAction:", error);
    return { status: "ERROR", message: "Failed to submit comment" };
  }
};

export const postSaveServerAction = async (data: savePostRequest) => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("Authorization")?.value;

  if (!accessToken) {
    console.error("Authorization token is missing from cookies.");
    return { status: "ERROR", message: "Authorization token is missing." };
  }

  try {
    const response = await fetch(`${process.env.API_URL}/user/save/post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Failed to save Post. Status:", response.status);
      console.error("Response body:", errorText);
      throw new Error("Failed to save Post");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error in commentSaveServerAction:", error);
    return { status: "ERROR", message: "Failed to submit comment" };
  }
};

export async function getCookie() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("Authorization")?.value;
  const refreshToken = cookieStore.get("refresh_token")?.value;

  if (!accessToken && !refreshToken) return null;

  return { accessToken, refreshToken };
}

export async function removeCookie() {
  const cookieStore = cookies();

  cookieStore.set("Authorization", "", {
    secure: true,
    httpOnly: true,
    maxAge: -1,
  });

  cookieStore.set("refresh_token", "", {
    secure: true,
    httpOnly: true,
    maxAge: -1,
  });
}
