"use client";
import React, { useState, useEffect } from "react";
import Paging from "@/app/components/Paging";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { PhotoItem } from "@/app/types";
import { FaTrash, FaArrowRight } from "react-icons/fa";
import TransferPopup from "@/app/components/boards/TransferPopup";
import { useUserStore } from "@/app/globalStatus/useUserStore";

interface EventBoardClientProps {
  initialData: {
    boardList: PhotoItem[];
    totalElements: number;
    totalPages: number;
  };
}

const EventBoardClient: React.FC<EventBoardClientProps> = ({ initialData }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { userInfo } = useUserStore();

  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [boardList, setBoardList] = useState<PhotoItem[]>(
    initialData.boardList
  );
  const [totalElements, setTotalElements] = useState(initialData.totalElements);
  const [totalPages, setTotalPages] = useState(initialData.totalPages);
  const [currentPage, setCurrentPage] = useState(1);
  const [showTransferPopup, setShowTransferPopup] = useState(false);

  // Parameters with default values
  const size = 12; // items per page
  const typ = searchParams.get("typ") || "14";
  const keyword = searchParams.get("keyword") || "";

  const fetchData = async (page: number) => {
    try {
      const response = await fetch(
        `/api/board/photoList?typ=${typ}&keyword=${keyword}&page=${page - 1}&size=${size}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          cache: "no-store",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch photo board data");
      }

      const data = await response.json();
      setBoardList(data.data.content);
      setTotalElements(data.data.totalElements);
      setTotalPages(data.data.totalPages);
    } catch (error) {
      console.error("Error fetching photo board data:", error);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage, typ, keyword]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    router.replace(`${pathname}?page=${newPage}`);
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([]);
    } else {
      setSelectedItems(boardList.map((item) => item.id));
    }
    setSelectAll(!selectAll);
  };

  const handleSelectItem = (id: number) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((itemId) => itemId !== id)
        : [...prevSelected, id]
    );
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
        headers: { "Content-Type": "application/json" },
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
    } catch (error) {
      console.error("Error transferring selected items:", error);
      alert("An error occurred while transferring the selected posts.");
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedItems.length === 0) {
      alert("No items selected for deletion.");
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete the selected items?"
    );
    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch("/api/board/deletePost", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idList: selectedItems }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete selected posts");
      }

      setBoardList((prevBoardList) =>
        prevBoardList.filter((item) => !selectedItems.includes(item.id))
      );
      setSelectedItems([]);
      setSelectAll(false);
    } catch (error) {
      console.error("Error deleting selected items:", error);
      alert("An error occurred while deleting the selected posts.");
    }
  };

  return (
    <section className="flex flex-col mt-3">
      <div className="w-full">
        <div
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-1 w-full
        "
        >
          <div className="flex items-center gap-2">
            <div className="text-[#555555] text-sm">
              총
              <span className="text-[#2C4AB6] font-semibold">
                {" "}
                {totalElements}
              </span>
              건
            </div>
            <div className="text-[#555555] text-sm">
              {"("}
              <span className="text-[#2C4AB6] font-semibold">
                {currentPage}
              </span>
              /<span> {Math.ceil(totalElements / size)}</span> 페이지{")"}
            </div>
          </div>
        </div>
        {userInfo?.sck && (
          <div className="mt-5 flex justify-end items-center gap-5">
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
      </div>

      <ul className="mt-5 min-w-full bg-white overflow-hidden overflow-x-auto text-[14px] grid grid-cols-1 md:grid-cols-2 gap-2">
        {boardList.map((item) => (
          <li key={item.id} className="bg-white rounded-lg py-4 relative">
            <input
              type="checkbox"
              className="absolute top-6 left-2 z-10 h-4 w-4"
              checked={selectedItems.includes(item.id)}
              onChange={() => handleSelectItem(item.id)}
            />
            <div className="overflow-hidden rounded-lg flex justify-center items-center">
              <Link href={`${pathname}/${item.id}`}>
                <Image
                  width={477}
                  height={141}
                  className="w-[477px] h-[141px] rounded-lg object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
                  src={item.thumbNail || "/images/default-thumbnail.jpg"}
                  alt={item.title}
                />
              </Link>
            </div>
            <section className="w-full flex flex-col justify-center px-2 py-1">
              <div className="w-full flex justify-between">
                <p className="w-full text-right truncate text-sm text-subtext">
                  {item.createdDt.toString()}~종료시까지
                </p>
              </div>
            </section>
          </li>
        ))}
      </ul>

      {userInfo?.sck && (
        <span className="w-full flex justify-end mt-3">
          <Link href={`${pathname}/write`}>
            <button className="bg-blue text-white hover:bg-mediumblue rounded-sm text-[13px] px-3 py-3">
              글작성하기
            </button>
          </Link>
        </span>
      )}

      {/* Pagination component */}
      <Paging
        page={currentPage}
        size={size}
        totalElements={totalElements}
        setPage={handlePageChange}
        scroll={"top"}
      />

      {/* Transfer popup for move action */}
      {showTransferPopup && (
        <TransferPopup
          onClose={() => setShowTransferPopup(false)}
          onConfirm={handleTransferConfirm}
        />
      )}
    </section>
  );
};

export default EventBoardClient;
