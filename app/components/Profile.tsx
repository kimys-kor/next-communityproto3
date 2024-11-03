"use client";

import React from "react";
import Avatar from "@/app/components/Avatar";
import { removeCookie } from "../api/authAction";
import { useAuthStore } from "@/app/globalStatus/useAuthStore";
import { useUserStore } from "@/app/globalStatus/useUserStore";
import Link from "next/link";
import { UserInfo } from "../types";

interface ProfileProps {
  userInfo: UserInfo | null;
}

function Profile({ userInfo }: ProfileProps) {
  const { setLoggedIn } = useAuthStore();
  const { clearUserInfo } = useUserStore();

  const logoutSubmit = () => {
    removeCookie();
    setLoggedIn(false);
    clearUserInfo();
  };

  return (
    <section className="p-2 flex flex-col gap-2 items-center justify-center">
      <Avatar />
      <h1 className="text-xl font-medium">{userInfo?.nickname || "Guest"}</h1>
      <div>
        이름:{" "}
        <span className="text-base text-black font-medium">
          {userInfo?.fullName || "Unknown"}
        </span>
      </div>
      <div>
        포인트:{" "}
        <span className="text-base text-blue font-medium">
          {userInfo?.point ?? 0}
        </span>
      </div>
      <Link href="/myinfo" className="cursor-pointer hover:text-blue">
        정보수정
      </Link>

      {userInfo?.sck && (
        <Link
          href="/protectedadmins"
          className="cursor-pointer text-blue hover:text-deepblue"
        >
          관리자페이지
        </Link>
      )}

      <button
        onClick={logoutSubmit}
        className="py-3 px-4 bg-blue hover:bg-[#2250f5] text-white font-bold w-full rounded focus:outline-none"
      >
        로그아웃
      </button>
    </section>
  );
}

export default Profile;
