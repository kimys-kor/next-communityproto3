"use client";
import React, { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { BoardItem, Member } from "../../types";
import Paging from "@/app/components/Paging";
import Link from "next/link";
import NewIcon from "../NewIcon";
import toast from "react-hot-toast";
import { useUserStore } from "@/app/globalStatus/useUserStore";
import { FaTrash, FaArrowRight } from "react-icons/fa";
import TransferPopup from "@/app/components/boards/TransferPopup";

interface BoardClientProps {
  initialItems: BoardItem[];
  initialPage: number;
  totalElements: number;
  size: number;
  typ: number;
  writeBoolean: boolean;
}

const BoardClient: React.FC<BoardClientProps> = ({
  writeBoolean,
  initialItems,
  initialPage,
  totalElements: initialTotalElements,
  size,
  typ,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { userInfo } = useUserStore();
  const [boardList, setBoardList] = useState<BoardItem[]>(initialItems);
  const [page, setPage] = useState(initialPage);
  const [totalElements, setTotalElements] = useState(initialTotalElements);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showTransferPopup, setShowTransferPopup] = useState(false);

  const totalPages = Math.ceil(totalElements / size);

  const fetchData = async (pageNumber: number, keyword: string) => {
    try {
      const response = await fetch(
        `/api/board/list?typ=${typ}&keyword=${keyword}&page=${pageNumber - 1}&size=${size}`,
        { cache: "no-store" }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch board list");
      }
      const data = await response.json();
      setBoardList(data.data.content);
      setTotalElements(data.data.totalElements);
    } catch (error) {
      console.error("Error fetching board list:", error);
      toast.error("Failed to fetch board list");
    }
  };

  const [keyword, setKeyword] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchField, setSearchField] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearch = () => {
    setCurrentPage(1);
    setKeyword(searchQuery);
  };

  useEffect(() => {
    const pageFromQuery = parseInt(searchParams.get("page") || "1", 10);
    setPage(pageFromQuery);
    fetchData(pageFromQuery, keyword);
  }, [searchParams, keyword]);

  const handlePageChange = (newPage: number) => {
    router.replace(`${pathname}?page=${newPage}`);
    setPage(newPage);
    fetchData(newPage, keyword);
  };

  const isNew = (dateString: string) => {
    const itemDate = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - itemDate.getTime()) / (1000 * 60 * 60);
    return diffInHours <= 24;
  };

  const handleSelectItem = (id: number) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((itemId) => itemId !== id)
        : [...prevSelected, id]
    );
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([]);
    } else {
      setSelectedItems(boardList.map((item) => item.id));
    }
    setSelectAll(!selectAll);
  };

  const handleMoveSelected = () => {
    if (selectedItems.length === 0) {
      alert("이동하실 게시물을 선택하세요");
      return;
    }
    setShowTransferPopup(true);
  };

  const handleTransferConfirm = async (postType: number) => {
    try {
      const response = await fetch("/api/board/transferPost", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idList: selectedItems, postType }),
      });

      if (!response.ok) {
        throw new Error("Failed to transfer selected posts");
      }

      setBoardList((prevBoardList) =>
        prevBoardList.filter((item) => !selectedItems.includes(item.id))
      );
      setSelectedItems([]);
      setSelectAll(false);
      setShowTransferPopup(false);
      router.refresh();
    } catch (error) {
      console.error("Error transferring selected items:", error);
      alert("An error occurred while transferring the selected posts.");
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedItems.length === 0) {
      alert("게시글을 선택 해주세요.");
      return;
    }

    const confirmed = window.confirm("정말 삭제 하시겠습니까?");
    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch("/api/board/deletePost", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idList: selectedItems }),
      });

      if (!response.ok) {
        throw new Error("게시글삭제 실패");
      }

      await fetchData(page, keyword);

      setSelectedItems([]);
      setSelectAll(false);
      toast.success("선택한 게시물이 성공적으로 삭제되었습니다.");
    } catch (error) {
      console.error("Error deleting selected items:", error);
      alert("An error occurred while deleting the selected posts.");
    }
  };

  return (
    <section className="flex flex-col gap-1 mt-3">
      <div className="flex items-center gap-3 mb-6 p-3 bg-white rounded-md border border-solid border-gray-200 shadow-sm">
        <select
          className="p-2 border border-solid border-gray-300 rounded bg-gray-100 text-gray-700 text-sm"
          value={searchField}
          onChange={(e) => setSearchField(e.target.value)}
        >
          <option value="all">전체</option>
          <option value="username">회원의 아이디</option>
          <option value="phoneNum">전화번호</option>
          <option value="fullName">풀네임</option>
          <option value="nickname">닉네임</option>
          <option value="status">상태</option>
          <option value="createdDt">날짜</option>
        </select>
        <input
          type="text"
          placeholder="검색어 입력"
          className="p-2 border border-solid border-gray-300 rounded w-64 text-gray-700 text-sm bg-gray-100"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-gray-600 text-white text-sm rounded-md font-medium"
        >
          검색
        </button>
      </div>
      <header className="flex justify-between items-center w-full text-xs md:text-sm text-[#555555]">
        <div className="flex gap-2">
          <div className="text-[#555555] text-sm flex items-center gap-2">
            총
            <span className="text-[#2C4AB6] font-semibold">
              {totalElements}
            </span>
            건
          </div>
          <div className="text-[#555555] text-sm">
            {"("}
            <span className="text-[#2C4AB6] font-semibold">{page}</span> /{" "}
            <span>{totalPages}</span> 페이지{")"}
          </div>
        </div>
        {userInfo?.sck && (
          <div className="flex items-center gap-5">
            <label className="flex items-center cursor-pointer text-purple-600 text-sm gap-1 hover:text-purple-800">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
                className="hidden"
              />
              <span>전체선택</span>
            </label>
            <button
              onClick={handleMoveSelected}
              className="flex items-center gap-1 text-teal-600 text-sm hover:text-teal-800"
            >
              <FaArrowRight />
              <span>이동</span>
            </button>
            <button
              onClick={handleDeleteSelected}
              className="flex items-center gap-1 text-red-600 text-sm hover:text-red-800"
            >
              <FaTrash />
              <span>삭제</span>
            </button>
          </div>
        )}
      </header>

      {/* Table rendering the board items */}
      <table className="min-w-full bg-white text-[14px]">
        <thead className="bg-[#F2F5FF]">
          <tr className="flex border-t-2 border-[#2C4AB6] text-[#2C4AB6] font-semibold">
            {userInfo?.sck && (
              <th className="w-14 py-3 px-2 text-center">선택</th>
            )}
            <th className="grow py-3 px-2 text-center">제목</th>
            <th className="w-20 py-3 px-2 text-center">이름</th>
            <th className="hidden md:block w-32 py-3 px-2 text-center">날짜</th>
            <th className="hidden md:block w-20 py-3 px-2 text-center">조회</th>
            <th className="hidden md:block w-20 py-3 px-2 text-center">추천</th>
          </tr>
        </thead>
        <tbody>
          {boardList.map((boardItem) => (
            <tr
              key={boardItem.id}
              className="border-b border-solid border-gray-200 flex bg-white hover:bg-[#f1f3fa] hover:text-blue"
            >
              {userInfo?.sck && (
                <td className="w-10 py-4 px-2 text-center">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(boardItem.id)}
                    onChange={() => handleSelectItem(boardItem.id)}
                    className="h-4 w-4"
                  />
                </td>
              )}
              <td className="grow py-4 px-2 font-medium">
                <div className="flex items-center gap-1 leading-5">
                  {isNew(boardItem.createdDt.toString()) && <NewIcon />}
                  <Link href={`${pathname}/${boardItem.id}`}>
                    {boardItem.title}
                    {boardItem.replyNum > 0 && (
                      <span className="text-blue ml-2 text-sm">
                        +{boardItem.replyNum}
                      </span>
                    )}
                  </Link>
                </div>
              </td>
              <td className="truncate w-20 py-4 px-2 text-center flex items-center">
                {boardItem.nickname}
              </td>
              <td className="hidden md:block w-32 py-4 px-2 text-center">
                {boardItem.createdDt.toString()}
              </td>
              <td className="hidden md:block w-20 py-4 px-2 text-center">
                {boardItem.hit}
              </td>
              <td className="hidden md:block w-20 py-4 px-2 text-center">
                {boardItem.likes}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {writeBoolean
        ? userInfo?.role && (
            <span className="mt-5 w-full flex justify-end">
              <Link href={`${pathname}/write`}>
                <button className="bg-blue text-white hover:bg-mediumblue rounded-sm text-[13px] px-3 py-3">
                  글작성하기
                </button>
              </Link>
            </span>
          )
        : userInfo?.sck && (
            <span className="mt-5 w-full flex justify-end">
              <Link href={`${pathname}/write`}>
                <button className="bg-blue text-white hover:bg-mediumblue rounded-sm text-[13px] px-3 py-3">
                  글작성하기
                </button>
              </Link>
            </span>
          )}

      <Paging
        page={page}
        size={size}
        totalElements={totalElements}
        setPage={handlePageChange}
        scroll="top"
      />

      {showTransferPopup && (
        <TransferPopup
          onClose={() => setShowTransferPopup(false)}
          onConfirm={handleTransferConfirm}
        />
      )}
    </section>
  );
};

export default BoardClient;
