"use client";

import { HttpStatusCode } from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface NewAdminMemberFormProps {
  onSave: () => void;
  onCancel: () => void;
  currentPage: number;
  keyword: string;
  fetchData: (pageNumber: number, searchKeyword: string) => void;
}

const NewAdminMemberForm: React.FC<NewAdminMemberFormProps> = ({
  onSave,
  onCancel,
  currentPage,
  keyword,
  fetchData,
}) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    fullName: "",
    phoneNum: "",
    nickname: "",
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSaveAdmin = async () => {
    try {
      const response = await fetch("/api/master/saveAdmin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();

        if (
          response.status === HttpStatusCode.BadRequest &&
          errorData.error?.code === "USER_ALREADY_EXIST"
        ) {
          toast.error("이미 존재하는 아이디입니다.");
        } else {
          toast.error(errorData.message || "관리자 생성에 실패하였습니다.");
        }
        return;
      }

      toast.success("관리자가 성공적으로 추가되었습니다.");
      fetchData(currentPage, keyword);
      onSave();
    } catch (error) {
      console.error("Error saving admin:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="mt-4 p-4 bg-gray-100 border rounded-md">
      <h3 className="text-lg font-semibold mb-2">New Admin Member</h3>
      <div className="space-y-2">
        <input
          type="text"
          name="username"
          placeholder="아이디"
          value={formData.username}
          onChange={handleFormChange}
          className="w-full p-2 border border-solid border-gray-300 rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="비밀번호"
          value={formData.password}
          onChange={handleFormChange}
          className="w-full p-2 border border-solid border-gray-300 rounded"
          required
        />
        <input
          type="text"
          name="fullName"
          placeholder="이름"
          value={formData.fullName}
          onChange={handleFormChange}
          className="w-full p-2 border border-solid border-gray-300 rounded"
          required
        />
        <input
          type="text"
          name="phoneNum"
          placeholder="전화번호"
          value={formData.phoneNum}
          onChange={handleFormChange}
          className="w-full p-2 border border-solid border-gray-300 rounded"
          required
        />
        <input
          type="text"
          name="nickname"
          placeholder="닉네임"
          value={formData.nickname}
          onChange={handleFormChange}
          className="w-full p-2 border border-solid border-gray-300 rounded"
          required
        />
      </div>
      <div className="mt-4 flex gap-3">
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-gray-400 text-white rounded-md"
        >
          취소
        </button>
        <button
          onClick={handleSaveAdmin}
          className="px-4 py-2 bg-blue text-white rounded-md"
        >
          저장
        </button>
      </div>
    </div>
  );
};

export default NewAdminMemberForm;
