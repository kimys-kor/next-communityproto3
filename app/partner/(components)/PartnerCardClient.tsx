"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PhotoItem } from "@/app/types";
import Paging from "@/app/components/Paging";
import { useUserStore } from "@/app/globalStatus/useUserStore";
import { FaTrash, FaArrowRight } from "react-icons/fa";
import TransferPopup from "@/app/components/boards/TransferPopup";

interface PartnerCardClientProps {
  initialData: {
    boardList: PhotoItem[];
    totalElements: number;
    totalPages: number;
  };
}

const PartnerCardClient: React.FC<PartnerCardClientProps> = ({
  initialData,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const size = 12;

  const { userInfo } = useUserStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [boardList, setBoardList] = useState<PhotoItem[]>(
    initialData.boardList
  );
  const [totalElements, setTotalElements] = useState(initialData.totalElements);
  const [totalPages, setTotalPages] = useState(initialData.totalPages);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showTransferPopup, setShowTransferPopup] = useState(false);

  useEffect(() => {
    const pageFromQuery = parseInt(searchParams.get("page") || "1", 10);
    setCurrentPage(pageFromQuery);
  }, [searchParams]);

  useEffect(() => {
    const fetchBoardContent = async () => {
      setBoardList([]);
      try {
        const response = await fetch(
          `/api/board/partnerList?page=${currentPage - 1}&size=${size}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch partner content");
        }

        const data = await response.json();
        setBoardList(data.data.content);
        setTotalElements(data.data.totalElements);
        setTotalPages(data.data.totalPages);
      } catch (error) {
        console.error("Error fetching partner content:", error);
      }
    };

    fetchBoardContent();
  }, [currentPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    router.replace(`/partner?page=${newPage}`);
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
        body: JSON.stringify({
          idList: selectedItems,
          postType,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to transfer selected posts");
      }

      const result = await response.json();
      console.log("Transfer result:", result);

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
      alert("선택한 아이템이 없습니다.");
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
        body: JSON.stringify({
          idList: selectedItems,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete selected posts");
      }

      const result = await response.json();
      console.log("Deletion result:", result);

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
    <div className="flex flex-col gap-5">
      <header className="flex justify-between items-center w-full text-xs md:text-sm text-[#555555]">
        <div className="w-full flex gap-2 items-center justify-between">
          <div className="flex items-center">
            <span className="text-[#555555] text-sm">
              총{" "}
              <span className="text-[#2C4AB6] font-semibold">
                {totalElements}
              </span>{" "}
              건
            </span>
            <span className="text-[#555555] text-sm">
              {"("}
              <span className="text-[#2C4AB6] font-semibold">
                {currentPage}
              </span>{" "}
              / <span>{totalPages}</span> 페이지{")"}
            </span>
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
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {boardList.map((item) => (
          <article
            key={item.id}
            className="w-full max-w-[300px] min-w-[250px] h-auto max-h-[220px] bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300 rounded-lg overflow-hidden flex flex-col items-center text-center mx-auto"
          >
            <div className="relative h-[140px] w-full overflow-hidden">
              {userInfo?.sck && (
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item.id)}
                  onChange={() => handleSelectItem(item.id)}
                  className="absolute top-2 left-2 z-10 h-4 w-4 accent-blue-600 cursor-pointer"
                />
              )}
              <Link href={`/partner/${item.id}`}>
                <Image
                  width={250}
                  height={140}
                  className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-105"
                  src={item.thumbNail || "/images/homebanner/4.jpg"}
                  alt={item.title}
                />
              </Link>
            </div>
            <div className="p-2 flex flex-col items-center">
              <h3 className="font-semibold text-md text-gray-800">
                {item.title}
              </h3>
              <p className="text-gray-500 mt-1 text-sm">Code: {item.code}</p>
              {item.replyNum > 0 && (
                <p className="text-xs mt-1 text-blue-700 font-bold">
                  +{item.replyNum} Replies
                </p>
              )}
            </div>
          </article>
        ))}
      </div>

      {userInfo?.sck && (
        <span className="w-full flex justify-end mt-3">
          <Link href="/partner/write">
            <button className="bg-blue hover:bg-[#2250f5] text-white font-bold rounded focus:outline-none text-[13px] px-3 py-3">
              파트너 등록
            </button>
          </Link>
        </span>
      )}

      <Paging
        page={currentPage}
        size={size}
        totalElements={totalElements}
        setPage={handlePageChange}
        scroll={"top"}
      />

      {/* Transfer Popup */}
      {showTransferPopup && (
        <TransferPopup
          onClose={() => setShowTransferPopup(false)}
          onConfirm={handleTransferConfirm}
        />
      )}
    </div>
  );
};

export default PartnerCardClient;
