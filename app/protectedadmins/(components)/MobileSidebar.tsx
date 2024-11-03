"use client";
import React, { useEffect, useRef, useState } from "react";
import { FiMenu } from "react-icons/fi";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { menuItems } from "@/app/utils";
import { useUserStore } from "@/app/globalStatus/useUserStore";

export default function MobileSidebar() {
  const { userInfo } = useUserStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Close sidebar on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header className="flex md:hidden items-center p-4 bg-gray-800 text-white">
        <button onClick={toggleSidebar} className="p-2">
          <FiMenu size={24} />
        </button>
        <h1 className="ml-4 text-lg font-semibold">꽁머니팡 관리자</h1>
      </header>

      <aside
        ref={sidebarRef}
        className={`fixed left-0 z-40 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 bg-gray-100 w-64 md:hidden h-full p-3`}
      >
        <button
          onClick={toggleSidebar}
          className="absolute top-4 right-4 text-gray-800"
        >
          ✕
        </button>

        <div className="flex flex-col gap-4">
          <div className="bg-gray-100 rounded-lg p-4 h-screen w-full max-w-full lg:max-w-xs overflow-y-auto">
            <Link
              className="hover:text-blue text-lg font-semibold flex items-center mb-4 lg:mb-6"
              href="/"
              onClick={toggleSidebar} // Close sidebar on link click
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
                        onClick={toggleSidebar} // Close sidebar on link click
                      >
                        <li className="truncate px-3 py-2 text-gray-700 rounded-md hover:bg-gray-200 hover:text-gray-800 transition-colors text-sm md:text-base">
                          {subItem.name}
                        </li>
                      </Link>
                    ))}
                  </ul>
                </div>
              ))}

              {/* Hardcoded "마스터" section */}
              {userInfo?.sck === "asdasdfz12e5t185g8" && (
                <div className="mb-4">
                  <li className="truncate px-4 py-3 rounded-md bg-blue-500 text-black transition-colors text-base md:text-lg">
                    마스터
                  </li>
                  <ul className="mt-2 pl-4 space-y-1">
                    <Link
                      href="/protectedadmins/admin-members"
                      className="block w-full"
                      onClick={toggleSidebar} // Close sidebar on link click
                    >
                      <li className="truncate px-3 py-2 text-gray-700 rounded-md hover:bg-gray-200 hover:text-gray-800 transition-colors text-sm md:text-base">
                        관리자아이디관리
                      </li>
                    </Link>
                    <Link
                      href="/protectedadmins/admin-log"
                      className="block w-full"
                      onClick={toggleSidebar} // Close sidebar on link click
                    >
                      <li className="truncate px-3 py-2 text-gray-700 rounded-md hover:bg-gray-200 hover:text-gray-800 transition-colors text-sm md:text-base">
                        관리자활동히스토리
                      </li>
                    </Link>
                  </ul>
                </div>
              )}
            </ul>
          </div>
        </div>
      </aside>
    </>
  );
}
