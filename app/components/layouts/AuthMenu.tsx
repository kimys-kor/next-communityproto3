"use client";

import React from "react";
import Link from "next/link";

interface AuthMenuProps {
  setActiveTab: (tab: number) => void;
}

const AuthMenu: React.FC<AuthMenuProps> = ({ setActiveTab }) => {
  return (
    <ul className="w-full table-row mb-4 bg-blue">
      <li
        className="w-1/3 table-cell hover:bg-mediumblue text-white text-lg text-center px-2 py-2 cursor-pointer"
        onClick={() => setActiveTab(2)}
      >
        로그인
      </li>
      <li className="w-1/3 table-cell hover:bg-mediumblue text-white text-lg text-center px-2 py-2 cursor-pointer">
        <Link href="/signup">회원가입</Link>
      </li>
      <li className="w-1/3 table-cell hover:bg-mediumblue text-white text-lg text-center px-2 py-2 cursor-pointer">
        정보찾기
      </li>
    </ul>
  );
};

export default AuthMenu;
