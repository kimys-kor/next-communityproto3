"use client";
import React, { useEffect, useState } from "react";
import Paging from "@/app/components/Paging";
import toast from "react-hot-toast";

type AdminLog = {
  id: number;
  actionType: number;
  username: string;
  content: string;
  createdDt: string;
};

function AdminLogHistoryClient() {
  const size = 10;
  const [histories, setHistories] = useState<AdminLog[]>([]);
  const [searchField, setSearchField] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchData = async (page: number, searchKeyword: string) => {
    try {
      const response = await fetch(
        `/api/master/adminlog?page=${page - 1}&size=${size}&keyword=${encodeURIComponent(searchKeyword)}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch admin log data");
      }
      const data = await response.json();

      setHistories(data.data.content || []);
      setTotalElements(data.data.totalElements);
      setTotalPages(data.data.totalPages);
    } catch (error) {
      console.error("Error fetching admin logs:", error);
      toast.error("Failed to load admin logs.");
    }
  };

  useEffect(() => {
    fetchData(currentPage, searchQuery);
  }, [currentPage, searchQuery]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleSearch = () => {
    setCurrentPage(1);
    fetchData(1, searchQuery);
  };

  return (
    <div>
      {/* Search Controls */}
      <div className="flex items-center gap-3 mb-6 p-3 bg-white rounded-md border border-solid border-gray-200 shadow-sm">
        <select
          className="p-2 border border-solid border-gray-300 rounded bg-gray-100 text-gray-700 text-sm"
          value={searchField}
          onChange={(e) => setSearchField(e.target.value)}
        >
          <option value="all">전체</option>
          <option value="username">유저 이름</option>
          <option value="content">내용</option>
          <option value="createdDt">생성 날짜</option>
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

      <header className="flex justify-between items-center w-full text-xs md:text-sm text-[#555555] mb-4">
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
      </header>

      {/* Admin Log Histories Table */}
      <div className="w-full overflow-x-auto">
        <table className="w-full bg-white truncate border border-solid border-gray-300">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-sm">
              <th className="py-2 px-4 border-b border-solid">ID</th>
              <th className="py-2 px-4 border-b border-solid">행동 유형</th>
              <th className="py-2 px-4 border-b border-solid">유저 이름</th>
              <th className="py-2 px-4 border-b border-solid">내용</th>
              <th className="py-2 px-4 border-b border-solid">생성 날짜</th>
            </tr>
          </thead>
          <tbody>
            {histories.map((history, index) => (
              <tr
                key={history.id}
                className={`text-gray-600 text-sm ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-200 transition-colors duration-200`}
              >
                <td className="py-2 px-4 border-b border-solid text-center">
                  {history.id}
                </td>
                <td className="py-2 px-4 border-b border-solid text-center">
                  {history.actionType}
                </td>
                <td className="py-2 px-4 border-b border-solid">
                  {history.username}
                </td>
                <td className="py-2 px-4 border-b border-solid">
                  {history.content}
                </td>
                <td className="py-2 px-4 border-b border-solid text-center">
                  {history.createdDt}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Component */}
      <div className="mt-10">
        <Paging
          page={currentPage}
          size={size}
          totalElements={totalElements}
          setPage={handlePageChange}
          scroll="top"
        />
      </div>
    </div>
  );
}

export default AdminLogHistoryClient;
