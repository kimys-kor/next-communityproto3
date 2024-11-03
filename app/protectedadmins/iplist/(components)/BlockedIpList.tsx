"use client";
import React, { useEffect, useState } from "react";
import Paging from "@/app/components/Paging";
import { FaPlus, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";

export type BlockedIp = {
  id: number;
  ipAddress: string;
};

function BlockedIpList() {
  const [blockedIps, setBlockedIps] = useState<BlockedIp[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedIps, setSelectedIps] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const size = 10;

  const fetchData = async () => {
    try {
      const response = await fetch("/api/admin/iplist");
      if (!response.ok) throw new Error("Failed to fetch IP list data");

      const result = await response.json();
      if (Array.isArray(result.data)) {
        setBlockedIps(result.data);
        setTotalElements(result.data.length);
        setTotalPages(Math.ceil(result.data.length / size));
      } else {
        console.error("Expected data array, received:", result.data);
        toast.error("Failed to load IP list: invalid data format.");
      }
      setSelectedIps([]);
    } catch (error) {
      console.error("Error fetching IP list data:", error);
      toast.error("Failed to load IP list.");
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
      setSelectedIps([]);
    } else {
      setSelectedIps(blockedIps.map((ip) => ip.id));
    }
    setSelectAll(!selectAll);
  };

  const handleSelectIp = (id: number) => {
    setSelectedIps((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((ipId) => ipId !== id)
        : [...prevSelected, id]
    );
  };

  const handleDeleteSelected = async () => {
    if (selectedIps.length === 0) {
      alert("삭제할 IP를 선택하세요.");
      return;
    }

    const confirmed = window.confirm("선택한 IP를 삭제하시겠습니까?");
    if (!confirmed) return;

    try {
      await deleteSelectedIps(selectedIps);
      setSelectedIps([]);
      setSelectAll(false);
      toast.success("선택한 IP가 삭제되었습니다.");
      fetchData();
    } catch (error) {
      console.error("Error deleting IPs:", error);
      toast.error("삭제에 실패했습니다.");
    }
  };

  async function deleteSelectedIps(idList: number[]) {
    try {
      const response = await fetch("/api/admin/deleteIp", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idList }),
      });

      if (!response.ok) {
        throw new Error("IP 삭제 실패");
      }
    } catch (error) {
      console.error("Error deleting selected IPs:", error);
      toast.error("An error occurred while deleting the selected IPs.");
    }
  }

  const handleSaveIp = async () => {
    const ipAddress = prompt("추가할 아이피를 입력하세요.");

    if (!ipAddress) {
      return;
    }

    try {
      const response = await fetch("/api/admin/saveip", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ipAddress }),
      });

      if (!response.ok) throw new Error("Failed to save IP");

      toast.success("IP가 성공적으로 추가되었습니다.");
      fetchData();
    } catch (error) {
      console.error("Error saving IP:", error);
      toast.error("IP 추가에 실패했습니다.");
    }
  };

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
            onClick={handleSaveIp}
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

      {/* IPs Table */}
      <div className="mt-5 w-[500px] overflow-x-auto">
        <table className="w-full bg-white border border-solid border-gray-300">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-sm">
              <th className="py-2 px-4 border-b border-solid">선택</th>
              <th className="py-2 px-4 border-b border-solid">ID</th>
              <th className="py-2 px-4 border-b border-solid">IP 주소</th>
            </tr>
          </thead>
          <tbody>
            {blockedIps.map((ip) => (
              <tr
                key={ip.id}
                className="text-gray-600 text-sm hover:bg-gray-200 transition-colors duration-200"
              >
                <td className="py-2 px-4 border-b border-solid text-center">
                  <input
                    type="checkbox"
                    checked={selectedIps.includes(ip.id)}
                    onChange={() => handleSelectIp(ip.id)}
                    className="h-4 w-4"
                  />
                </td>
                <td className="py-2 px-4 border-b border-solid text-center">
                  {ip.id}
                </td>
                <td className="py-2 px-4 border-b border-solid">
                  {ip.ipAddress}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BlockedIpList;
