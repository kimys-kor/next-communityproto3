"use client";

import React, { useEffect, useState } from "react";
import { useUserStore } from "@/app/globalStatus/useUserStore";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { refreshUser } from "@/app/api/authAction";
import { useRouter } from "next/navigation";

interface MenuItem {
  name: string;
  subMenu: { name: string; link: string }[];
}

const menuItems: MenuItem[] = [
  {
    name: "회원관리",
    subMenu: [{ name: "회원 목록", link: "/protectedadmins" }],
  },
  {
    name: "포인트로그",
    subMenu: [
      { name: "포인트 히스토리", link: "/protectedadmins/point-history" },
    ],
  },
  {
    name: "IP관리",
    subMenu: [{ name: "차단IP 관리", link: "/protectedadmins/iplist" }],
  },
  {
    name: "배너관리",
    subMenu: [{ name: "배너 관리", link: "/protectedadmins/bannerlist" }],
  },
];

export default function AdminSide() {
  const { userInfo, setUserInfo } = useUserStore();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const initializeUser = async () => {
      const data = await refreshUser();
      if (data) {
        setUserInfo(data);
      } else {
        router.push("/");
      }
      setLoading(false);
    };
    initializeUser();
  }, [setUserInfo, router]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="bg-gray-100 rounded-lg p-4 h-screen w-full max-w-full lg:max-w-xs overflow-y-auto">
      <Link
        className="hover:text-blue text-lg font-semibold flex items-center mb-4 lg:mb-6"
        href="/"
      >
        유저페이지
        <FaArrowRight className="w-5 h-5 ml-2" />
      </Link>
      <ul className="text-lg font-medium space-y-4">
        {menuItems.map((item, index) => (
          <div key={index} className="mb-4">
            <li className="truncate px-4 py-3 rounded-md bg-blue-500 text-black transition-colors text-base md:text-lg">
              {item.name}
            </li>
            <ul className="mt-2 pl-4 space-y-1">
              {item.subMenu.map((subItem, subIndex) => (
                <Link
                  href={subItem.link}
                  key={subIndex}
                  className="block w-full"
                >
                  <li className="truncate px-3 py-2 text-gray-700 rounded-md hover:bg-gray-200 hover:text-gray-800 transition-colors text-sm md:text-base">
                    {subItem.name}
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        ))}

        {/* Conditionally render "마스터" section based on userInfo.sck */}
        {userInfo?.sck === "asdasdfz12e5t185g8" && (
          <div className="mb-4">
            <li className="truncate px-4 py-3 rounded-md bg-blue-500 text-black transition-colors text-base md:text-lg">
              마스터
            </li>
            <ul className="mt-2 pl-4 space-y-1">
              <Link
                href="/protectedadmins/admin-members"
                className="block w-full"
              >
                <li className="truncate px-3 py-2 text-gray-700 rounded-md hover:bg-gray-200 hover:text-gray-800 transition-colors text-sm md:text-base">
                  관리자아이디관리
                </li>
              </Link>
              <Link href="/protectedadmins/admin-log" className="block w-full">
                <li className="truncate px-3 py-2 text-gray-700 rounded-md hover:bg-gray-200 hover:text-gray-800 transition-colors text-sm md:text-base">
                  관리자활동히스토리
                </li>
              </Link>
            </ul>
          </div>
        )}
      </ul>
    </div>
  );
}
