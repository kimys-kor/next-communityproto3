import React from "react";

import Logo from "../../Logo";
import Link from "next/link";
import SearchBox from "../../search/SearchBox";
import Avatar from "/public/images/avatar.png";
import Navbar from "./Navbar";
import Image from "next/image";
import UserMenu from "./userMenu";

function Headers() {
  async function handleSearch() {
    "use server";
    console.log("전체검색");
  }

  return (
    <header className="box-border fixed w-full h-28 md:h-32 bg-white z-50 border-solid md:border-b border-blue">
      <div className="max-w-[1300px] mx-auto">
        <section className="w-full h-14 md:h-16 flex items-center justify-between gap-3 md:gap-0 px-2">
          <Link className="" prefetch href="/">
            <Logo></Logo>
          </Link>

          <div className="flex gap-5 justify-between h-7">
            {/* <SearchBox
              handleSearch={handleSearch}
              placeholderText="검색어를 입력하세요."
            ></SearchBox> */}
          </div>
        </section>
        <Navbar></Navbar>
      </div>
    </header>
  );
}

export default Headers;
