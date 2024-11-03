"use client";

import React, { useState } from "react";

import InfoChange from "./InfoChange";
import PasswordChange from "./PasswordChange";
import Image from "next/image";
import logo from "/public/images/logo.png";
import DeleteAccount from "./DeleteAccount";
import Link from "next/link";

const MyInfoTab = () => {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabId: number) => {
    setActiveTab(tabId);
  };

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <article className="mt-5 w-full lg:w-auto flex flex-col justify-center items-center lg:items-start lg:px-20">
        <div className="w-80 flex justify-center items-center">
          <Link href={"/"} className="cursor-pointer">
            <Image alt="logo" width={260} height={100} src={logo} />
          </Link>
        </div>
        <div className="w-80 pt-5 text-lg font-medium text-blue flex justify-center items-center">
          <p className="text-3xl">정보수정</p>
        </div>
      </article>
      <div className="py-5 flex items-center justify-center gap-5">
        <button
          onClick={() => handleTabClick(1)}
          className={`py-2 px-4 text-lg font-semibold border-b border-solid ${
            activeTab === 1
              ? "text-blue border-b border-blue"
              : "text-gray-600 border-transparent"
          }`}
        >
          내정보수정
        </button>
        <button
          onClick={() => handleTabClick(2)}
          className={`py-2 px-4 text-lg font-semibold border-b border-solid ${
            activeTab === 2
              ? "text-blue border-b border-blue"
              : "text-gray-600 border-transparent"
          }`}
        >
          비밀번호수정
        </button>
        <button
          onClick={() => handleTabClick(3)}
          className={`py-2 px-4 text-lg font-semibold border-b border-solid ${
            activeTab === 3
              ? "text-blue border-b border-blue"
              : "text-gray-600 border-transparent"
          }`}
        >
          회원탈퇴
        </button>
      </div>

      <div className="w-full flex items-center justify-center">
        {activeTab === 1 && <InfoChange />}
        {activeTab === 2 && <PasswordChange />}
        {activeTab === 3 && <DeleteAccount />}
      </div>
    </div>
  );
};

export default MyInfoTab;
