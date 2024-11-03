"use client";

import { useState } from "react";
import Login from "../login/Login";
import { IoCloseSharp } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdRefresh } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { IoMdMore } from "react-icons/io";
import { BsChatDots } from "react-icons/bs";
import { FaQuestionCircle } from "react-icons/fa";
import { FaTags } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaPeopleLine } from "react-icons/fa6";

import partnerIcon from "/public/images/partnerIcon.png";
import sportIcon from "/public/images/sportIcon.png";
import commuIcon from "/public/images/commuIcon.png";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useUserStore } from "@/app/globalStatus/useUserStore";
import Profile from "../Profile";
import AuthMenu from "./AuthMenu";
import { UserInfo } from "@/app/types";

interface LinkItem {
  href: string;
  label: string;
  icon?: StaticImageData;
  dropdown?: { href: string; label: string }[];
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SidebarTopNavItemProps {
  icon: JSX.Element;
  label: string;
  onClick: () => void;
}

interface SidebarMainNavProps {
  links: LinkItem[];
  onClose: () => void;
}

const sidebarData: LinkItem[] = [
  {
    href: "/partner",
    label: "파트너",
    icon: partnerIcon,
    dropdown: [{ href: "/partner", label: "파트너" }],
  },
  {
    href: "/sport",
    label: "스포츠분석",
    icon: sportIcon,
    dropdown: [
      { href: "/sport", label: "해외축구분석" },
      { href: "/sport/asia", label: "아시아축구분석" },
      { href: "/sport/mlb", label: "MLB분석" },
      { href: "/sport/baseball", label: "KBO/NPB분석" },
      { href: "/sport/nba", label: "NBA분석" },
      { href: "/sport/basket", label: "농구분석" },
      { href: "/sport/volley", label: "배구분석" },
    ],
  },
  {
    href: "/community",
    label: "커뮤니티",
    icon: commuIcon,
    dropdown: [
      { href: "/community", label: "안구정화" },
      { href: "/community/humor", label: "유머 & 이슈" },
      { href: "/community/pickster", label: "나는분석왕" },
      { href: "/community/free", label: "자유게시판" },
      { href: "/community/case", label: "피해사례" },
    ],
  },
  {
    href: "/event",
    label: "이벤트",
    dropdown: [{ href: "/event", label: "이벤트" }],
  },
  {
    href: "/promotion",
    label: "홍보센터",
    dropdown: [
      { href: "/promotion", label: "일반홍보" },
      { href: "/promotion/ggong", label: "꽁머니홍보" },
      { href: "/promotion/hunting", label: "구인구직" },
    ],
  },
  {
    href: "/guide",
    label: "가이드",
    dropdown: [
      { href: "/guide/ggong", label: "꽁머니" },
      { href: "/guide/major", label: "메이저" },
      { href: "/guide/safe", label: "안전놀이터" },
    ],
  },
  {
    href: "/customer",
    label: "고객센터",
    dropdown: [
      { href: "/customer", label: "공지사항" },
      { href: "/customer/qalist", label: "1:1 문의" },
    ],
  },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState(1);
  const [showMore, setShowMore] = useState(false);
  const { userInfo } = useUserStore();
  // const [userInfo, setUserInfoState] = useState<UserInfo | null>(null);

  const handleClose = () => {
    setShowMore(false);
    onClose();
  };

  return (
    <div
      className={`fixed top-0 left-0 h-full w-80 shadow-lg bg-white transform transition-transform duration-300 overflow-y-scroll ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Header */}
      <section className="bg-mediumblue border-b-2 border-blue-600 w-full flex justify-between items-center p-2">
        <p className="text-white text-2xl">
          꽁머니팡: 꽁머니 토토사이트 스포츠분석 안전놀이터
        </p>
        <button className="p-2" onClick={handleClose}>
          <IoCloseSharp color="white" size={30} />
        </button>
      </section>

      {/* Top Navigation */}
      <section className="flex flex-col">
        <article className="w-full border-y border-solid border-bordercolor3">
          <ul className="flex justify-around">
            <SidebarTopNavItem
              icon={<GiHamburgerMenu size={20} />}
              label="메뉴"
              onClick={() => setActiveTab(1)}
            />
            <SidebarTopNavItem
              icon={<IoMdRefresh size={22} />}
              label="새글"
              onClick={() => setActiveTab(3)}
            />
            <SidebarTopNavItem
              icon={<FaSearch size={20} />}
              label="검색"
              onClick={() => setActiveTab(3)}
            />
            <SidebarTopNavItem
              icon={<IoMdMore size={22} />}
              label="더보기"
              onClick={() => setShowMore(!showMore)}
            />
          </ul>
          {showMore && <SidebarAdditionalMenu />}
          <article className="w-full table border-collapse">
            {userInfo?.role ? (
              <Profile userInfo={userInfo} />
            ) : (
              <AuthMenu setActiveTab={setActiveTab} />
            )}
          </article>
        </article>

        {/* Main Navigation */}
        <article className="w-full bg-white">
          {activeTab === 1 && (
            <SidebarMainNav links={sidebarData} onClose={onClose} />
          )}
          {activeTab === 2 && <Login />}
        </article>
      </section>
    </div>
  );
};

export default Sidebar;

const SidebarTopNavItem: React.FC<SidebarTopNavItemProps> = ({
  icon,
  label,
  onClick,
}) => (
  <li
    className="flex-1 text-center p-4 cursor-pointer hover:text-blue"
    onClick={onClick}
  >
    <div className="flex flex-col justify-center items-center gap-2">
      {icon}
      <p className="text-sm">{label}</p>
    </div>
  </li>
);

const SidebarAdditionalMenu: React.FC = () => (
  <ul className="flex justify-around mb-4">
    <SidebarTopNavItem
      icon={<BsChatDots size={20} />}
      label="1:1문의"
      onClick={() => {}}
    />
    <SidebarTopNavItem
      icon={<FaQuestionCircle size={22} />}
      label="FAQ"
      onClick={() => {}}
    />
    <SidebarTopNavItem
      icon={<FaTags size={20} />}
      label="태그모음"
      onClick={() => {}}
    />
    <SidebarTopNavItem
      icon={<FaRegEyeSlash size={22} />}
      label="신고모음"
      onClick={() => {}}
    />
    <SidebarTopNavItem
      icon={<FaPeopleLine size={20} />}
      label="접속자"
      onClick={() => {}}
    />
  </ul>
);

const SidebarMainNav: React.FC<SidebarMainNavProps> = ({ links, onClose }) => (
  <div className="w-full">
    {links.map((link, index) => (
      <div key={index} className="w-full">
        <div className="w-full font-semibold text-lg px-4 py-2 hover:text-blue">
          <Link
            className="w-full flex items-center"
            href={link.href}
            onClick={onClose}
          >
            {link.icon && (
              <Image src={link.icon} width={33} height={33} alt="menuIcon" />
            )}
            <span className="ml-2">{link.label}</span>
          </Link>
        </div>

        <table
          className="w-full border-collapse"
          style={{ borderSpacing: "0 2px" }}
        >
          <tbody className="w-full">
            {link.dropdown &&
              link.dropdown.reduce((rows, item, idx, array) => {
                if (idx % 2 === 0) {
                  rows.push(
                    <tr className="w-full" key={idx}>
                      <td
                        className="w-1/2 px-4 py-2 border border-solid border-bordercolor3 bg-buttoncolor text-center hover:text-blue"
                        onClick={onClose}
                      >
                        <Link href={item.href}>{item.label}</Link>
                      </td>
                      {array[idx + 1] ? (
                        <td
                          className="w-1/2 px-4 py-2 border border-solid border-bordercolor3 bg-buttoncolor text-center hover:text-blue"
                          onClick={onClose}
                        >
                          <Link href={array[idx + 1].href}>
                            {array[idx + 1].label}
                          </Link>
                        </td>
                      ) : (
                        <td className="w-1/2 px-4 py-2 border border-solid border-bordercolor3 bg-buttoncolor"></td>
                      )}
                    </tr>
                  );
                }
                return rows;
              }, [] as JSX.Element[])}
          </tbody>
        </table>
      </div>
    ))}
  </div>
);
