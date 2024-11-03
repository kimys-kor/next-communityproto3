"use client";
import React, { useEffect, useState } from "react";
import Paging from "@/app/components/Paging";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";
import toast from "react-hot-toast";
import NewBannerForm from "./NewBannerForm";
import Image from "next/image";
import BannerDetail from "../../(components)/BannerDetail";

export type Banner = {
  id: number;
  partnerName: string;
  thumbNail: string;
  partnerUrl: string;
  clickNum: number;
};

function BannerList() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedBanners, setSelectedBanners] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState<Banner | null>(null);
  const size = 10;

  const fetchData = async () => {
    try {
      const response = await fetch("/api/admin/bannerlist");
      if (!response.ok) throw new Error("Failed to fetch banner data");

      const result = await response.json();
      if (Array.isArray(result.data)) {
        setBanners(result.data);
        setTotalElements(result.data.length);
        setTotalPages(Math.ceil(result.data.length / size));
      } else {
        console.error("Expected data array, received:", result.data);
        toast.error("Failed to load banner list: invalid data format.");
      }
      setSelectedBanners([]);
    } catch (error) {
      console.error("Error fetching banner data:", error);
      toast.error("Failed to load banner list.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedBanners([]);
    } else {
      setSelectedBanners(banners.map((banner) => banner.id));
    }
    setSelectAll(!selectAll);
  };

  const handleSelectBanner = (id: number) => {
    setSelectedBanners((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((bannerId) => bannerId !== id)
        : [...prevSelected, id]
    );
  };

  const handleDeleteSelected = async () => {
    if (selectedBanners.length === 0) {
      alert("삭제할 배너를 선택하세요.");
      return;
    }

    const confirmed = window.confirm("선택한 배너를 삭제하시겠습니까?");
    if (!confirmed) return;

    try {
      await deleteSelectedBanners(selectedBanners);
      setSelectedBanners([]);
      setSelectAll(false);
      toast.success("선택한 배너가 삭제되었습니다.");
      fetchData();
    } catch (error) {
      console.error("Error deleting banners:", error);
      toast.error("배너 삭제에 실패했습니다.");
    }
  };

  async function deleteSelectedBanners(idList: number[]) {
    try {
      const response = await fetch("/api/admin/deletebanner", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idList }),
      });

      if (!response.ok) {
        throw new Error("Banner 삭제 실패");
      }
    } catch (error) {
      console.error("Error deleting selected banners:", error);
      toast.error("An error occurred while deleting the selected banners.");
    }
  }

  if (selectedBanner) {
    return (
      <BannerDetail
        banner={selectedBanner}
        onBack={() => {
          setSelectedBanner(null);
          fetchData();
        }}
      />
    );
  }

  return (
    <div>
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
            <span className="text-[#2C4AB6] font-semibold">
              {currentPage}
            </span>{" "}
            / <span>{totalPages}</span> 페이지{")"}
          </div>
        </div>
        <div className="flex items-center gap-5">
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-1 text-black text-sm hover:text-blue"
          >
            <FaPlus />
            <span>추가</span>
          </button>
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
            onClick={handleDeleteSelected}
            className="flex items-center gap-1 text-red-600 text-sm hover:text-red-800"
          >
            <FaTrash />
            <span>삭제</span>
          </button>
        </div>
      </header>

      <div className="mt-5 w-auto overflow-x-auto">
        <table className="w-full bg-white border truncate border-solid border-gray-300">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-sm">
              <th className="py-2 px-4 border-b border-solid">선택</th>
              <th className="py-2 px-4 border-b border-solid">ID</th>
              <th className="py-2 px-4 border-b border-solid">파트너 이름</th>
              <th className="py-2 px-4 border-b border-solid">배너</th>
              <th className="py-2 px-4 border-b border-solid">파트너 URL</th>
              <th className="py-2 px-4 border-b border-solid">클릭 수</th>
              <th className="py-2 px-4 border-b border-solid">수정</th>
            </tr>
          </thead>
          <tbody>
            {banners.map((banner) => (
              <tr
                key={banner.id}
                className="text-gray-600 text-sm hover:bg-gray-200 transition-colors duration-200"
              >
                <td className="py-2 px-4 border-b border-solid text-center align-middle">
                  <input
                    type="checkbox"
                    checked={selectedBanners.includes(banner.id)}
                    onChange={() => handleSelectBanner(banner.id)}
                    className="h-4 w-4"
                  />
                </td>
                <td className="py-2 px-4 border-b border-solid text-center align-middle">
                  {banner.id}
                </td>
                <td className="py-2 px-4 border-b border-solid align-middle">
                  {banner.partnerName}
                </td>
                <td className="py-2 px-4 border-b border-solid align-middle">
                  <Image
                    src={banner.thumbNail}
                    width={150}
                    height={75}
                    alt="banner"
                  />
                </td>
                <td className="py-2 px-4 border-b border-solid align-middle">
                  <td className="py-2 px-4 border-b border-solid align-middle">
                    <a
                      href={
                        banner.partnerUrl.startsWith("http")
                          ? banner.partnerUrl
                          : `http://${banner.partnerUrl}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {banner.partnerUrl}
                    </a>
                  </td>
                </td>
                <td className="py-2 px-4 border-b border-solid text-center align-middle">
                  {banner.clickNum}
                </td>
                <td className="py-2 px-4 border-b border-solid text-center align-middle">
                  <button
                    onClick={() => setSelectedBanner(banner)}
                    className="px-3 py-1 text-xs text-gray-700 border border-solid border-gray-500 rounded hover:bg-gray-500 hover:text-white transition-colors duration-200"
                  >
                    <FaEdit />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <NewBannerForm onClose={() => setShowForm(false)} onSave={fetchData} />
      )}
    </div>
  );
}

export default BannerList;
