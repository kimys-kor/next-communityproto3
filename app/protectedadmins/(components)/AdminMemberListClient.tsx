"use client";

import React, { useEffect, useState } from "react";
import MemberDetail from "./MemberDetail";
import Paging from "@/app/components/Paging";
import { FaPlus, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import NewAdminMemberForm from "./NewAdminMemberForm";

export type Member = {
  id: number;
  username: string;
  phoneNum: string;
  fullName: string;
  nickname: string;
  point: number;
  exp: number;
  status: string;
  createdDt: string;
  lastLogin: string | null;
};

function AdminMemberListClient() {
  const size = 10;
  const [members, setMembers] = useState<Member[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [keyword, setKeyword] = useState<string>("");
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  const [showForm, setShowForm] = useState(false);

  const fetchData = async (pageNumber: number, searchKeyword: string) => {
    setMembers([]);
    try {
      const response = await fetch(
        `/api/master/adminuser?page=${pageNumber - 1}&size=${size}&keyword=${encodeURIComponent(
          searchKeyword
        )}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch member data");
      }
      const data = await response.json();
      setMembers(data.data.content || []);
      setTotalElements(data.data.totalElements || 0);
      setTotalPages(Math.ceil(data.data.totalElements / size) || 1);
      setSelectedMembers([]);
      setSelectAll(false);
    } catch (error) {
      console.error("Error fetching member data:", error);
      toast.error("Failed to load members.");
    }
  };

  useEffect(() => {
    fetchData(currentPage, keyword);
  }, [currentPage, keyword]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const [searchField, setSearchField] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearch = () => {
    setCurrentPage(1);
    setKeyword(searchQuery);
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedMembers([]);
    } else {
      setSelectedMembers(members.map((member) => member.username));
    }
    setSelectAll(!selectAll);
  };

  const handleSelectMember = (username: string) => {
    setSelectedMembers((prevSelected) =>
      prevSelected.includes(username)
        ? prevSelected.filter((memberUsername) => memberUsername !== username)
        : [...prevSelected, username]
    );
  };

  const handleAddClick = () => {
    setShowForm(true);
  };

  const handleBlockSelected = async () => {
    if (selectedMembers.length === 0) {
      alert("차단할 회원을 선택하세요.");
      return;
    }

    const confirmed = window.confirm("선택한 회원을 차단하시겠습니까?");
    if (!confirmed) return;

    try {
      const response = await fetch("/api/admin/deleteUser", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idList: selectedMembers }),
      });
      if (!response.ok) throw new Error("Failed to block selected members");

      setSelectedMembers([]);
      setSelectAll(false);
      toast.success("선택한 회원이 차단되었습니다.");
      fetchData(currentPage, keyword);
    } catch (error) {
      console.error("Error blocking members:", error);
      toast.error("차단에 실패했습니다.");
    }
  };

  if (selectedMember) {
    return (
      <MemberDetail
        member={selectedMember}
        onBack={() => setSelectedMember(null)}
      />
    );
  }

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
            <span className="text-[#2C4AB6] font-semibold">
              {currentPage}
            </span>{" "}
            / <span>{totalPages}</span> 페이지{")"}
          </div>
        </div>
        <div className="flex items-center gap-5">
          <button
            onClick={handleAddClick}
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
            onClick={handleBlockSelected}
            className="flex items-center gap-1 text-red-600 text-sm hover:text-red-800"
          >
            <FaTrash />
            <span>차단/해제</span>
          </button>
        </div>
      </header>

      {/* Add Member Form */}
      {showForm && (
        <NewAdminMemberForm
          onSave={() => setShowForm(false)}
          onCancel={() => setShowForm(false)}
          currentPage={currentPage}
          keyword={keyword}
          fetchData={fetchData}
        />
      )}

      {/* Members Table */}
      <div className="mt-5 w-full overflow-x-auto">
        <table className="w-full bg-white border truncate border-solid border-gray-300">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-sm">
              <th className="py-2 px-4 border-b border-solid">선택</th>
              <th className="py-2 px-4 border-b border-solid">ID</th>
              <th className="py-2 px-4 border-b border-solid">아이디</th>
              <th className="py-2 px-4 border-b border-solid">전화번호</th>
              <th className="py-2 px-4 border-b border-solid">이름</th>
              <th className="py-2 px-4 border-b border-solid">닉네임</th>
              <th className="py-2 px-4 border-b border-solid">포인트</th>
              <th className="py-2 px-4 border-b border-solid">경험치</th>
              <th className="py-2 px-4 border-b border-solid">상태</th>
              <th className="py-2 px-4 border-b border-solid">생성 날짜</th>
              <th className="py-2 px-4 border-b border-solid">마지막 로그인</th>
              <th className="py-2 px-4 border-b border-solid">수정</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr
                key={member.id}
                className="text-gray-600 text-sm hover:bg-gray-200 transition-colors duration-200"
              >
                <td className="py-2 px-4 border-b border-solid text-center">
                  <input
                    type="checkbox"
                    checked={selectedMembers.includes(member.username)}
                    onChange={() => handleSelectMember(member.username)}
                    className="h-4 w-4"
                  />
                </td>
                <td className="py-2 px-4 border-b border-solid text-center">
                  {member.id}
                </td>
                <td className="py-2 px-4 border-b border-solid text-center">
                  {member.username}
                </td>
                <td className="py-2 px-4 border-b border-solid text-center">
                  {member.phoneNum}
                </td>
                <td className="py-2 px-4 border-b border-solid text-center">
                  {member.fullName}
                </td>
                <td className="py-2 px-4 border-b border-solid text-center">
                  {member.nickname}
                </td>
                <td className="py-2 px-4 border-b border-solid text-center">
                  {member.point}
                </td>
                <td className="py-2 px-4 border-b border-solid text-center">
                  {member.exp}
                </td>
                <td className="py-2 px-4 border-b border-solid text-center">
                  {member.status}
                </td>
                <td className="py-2 px-4 border-b border-solid text-center">
                  {member.createdDt}
                </td>
                <td className="py-2 px-4 border-b border-solid text-center">
                  {member.lastLogin ? member.lastLogin : "모름"}
                </td>
                <td className="py-2 px-4 border-b border-solid text-center">
                  <button
                    onClick={() => setSelectedMember(member)}
                    className="px-3 py-1 text-xs text-gray-700 border border-solid border-gray-500 rounded hover:bg-gray-500 hover:text-white transition-colors duration-200"
                  >
                    수정
                  </button>
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

export default AdminMemberListClient;
