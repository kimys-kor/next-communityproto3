import React from "react";
import MemberListClient, { Member } from "./MemberListClient";
import { cookies } from "next/headers";

async function fetchInitialMemberData(
  page = 0,
  size = 15,
  keyword = ""
): Promise<{
  content: Member[];
  totalElements: number;
  page: number;
  size: number;
}> {
  "use server";
  const cookieStore = cookies();
  const accessToken = cookieStore.get("Authorization")?.value;

  try {
    const response = await fetch(
      `${process.env.API_URL}/admin/user/findall?page=${page}&size=${size}&keyword=${encodeURIComponent(keyword)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Failed to fetch member data:", errorText);
    }

    const responseData = await response.json();
    return {
      content: responseData.data.content,
      totalElements: responseData.data.totalElements,
      page: responseData.data.pageable.pageNumber,
      size: responseData.data.pageable.pageSize,
    };
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}

export default async function MemberList() {
  const {
    content: initialMembers,
    totalElements,
    page: initialPage,
    size,
  } = await fetchInitialMemberData();

  return (
    <div className="w-full p-3">
      <MemberListClient
        initialMembers={initialMembers}
        totalElements={totalElements}
        initialPage={initialPage}
        size={size}
      />
    </div>
  );
}
