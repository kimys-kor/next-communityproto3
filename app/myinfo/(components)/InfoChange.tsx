"use client";
import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useUserStore } from "@/app/globalStatus/useUserStore";

// Define the types for user information and editable data
interface FormData {
  fullname: string;
  nickname: string;
  phoneNum: string;
}

function InfoChange() {
  const { userInfo } = useUserStore();

  // Set up initial state based on userInfo
  const [editableData, setEditableData] = useState<FormData>({
    fullname: userInfo?.fullName || "",
    nickname: userInfo?.nickname || "",
    phoneNum: userInfo?.phoneNum || "",
  });

  // Detect changes to enable the submit button
  const hasChanges =
    editableData.fullname !== (userInfo?.fullName || "") ||
    editableData.nickname !== (userInfo?.nickname || "") ||
    (editableData.phoneNum !== (userInfo?.phoneNum || "") &&
      editableData.phoneNum.length === 11);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditableData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const apiData = {
      fullName: editableData.fullname,
      nickname: editableData.nickname,
      phoneNum: editableData.phoneNum,
    };

    try {
      const response = await fetch("/api/updateMyInfo", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiData),
      });

      if (!response.ok) {
        throw new Error("Failed to update user info");
      }

      const result = await response.json();
      console.log("User info updated successfully:", result);
      alert("회원정보가 성공적으로 수정되었습니다!");
      window.location.href = `/`;
    } catch (error) {
      console.error("Update error:", error);
      alert("회원정보 수정 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  useEffect(() => {
    setEditableData({
      fullname: userInfo?.fullName || "",
      nickname: userInfo?.nickname || "",
      phoneNum: userInfo?.phoneNum || "",
    });
  }, [userInfo]);

  return (
    <div className="w-full flex justify-center">
      <div className="w-full flex flex-col gap-10 justify-center items-center">
        <form
          onSubmit={onSubmit}
          className="w-full flex flex-col items-center gap-3"
        >
          <div className="w-full md:w-1/2 md:px-0 lg:w-1/3 px-3">
            <div className="w-full mt-3 flex flex-col gap-1">
              <div className="w-full flex flex-col gap-2 p-2">
                <p className="w-24">아이디</p>
                <input
                  defaultValue={userInfo?.username}
                  disabled
                  className="w-full truncate appearance-none border rounded py-2 px-1 font-normal text-sm text-subtext leading-tight focus:outline-none"
                />
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 px-3 md:px-0">
            <p className="py-3 font-semibold text-lg border-solid border-b border-[#F3F3F3]">
              개인정보 입력
            </p>
            <div className="mt-3 flex flex-col gap-3">
              <div className="w-full flex flex-col gap-3 p-2">
                <p className="w-24">이름</p>
                <input
                  name="fullname"
                  value={editableData.fullname}
                  onChange={handleInputChange}
                  className="truncate appearance-none border rounded py-2 px-1 font-normal text-sm text-gray-700 leading-tight focus:outline-none"
                />
              </div>
              <div className="w-full flex flex-col gap-3 p-2">
                <p className="w-24">닉네임</p>
                <input
                  name="nickname"
                  value={editableData.nickname}
                  onChange={handleInputChange}
                  className="truncate appearance-none border rounded py-2 px-1 font-normal text-sm text-gray-700 leading-tight focus:outline-none"
                />
              </div>
              <div className="w-full flex flex-col gap-2 p-2">
                <p className="w-24">핸드폰번호</p>
                <p className="text-subtext2 text-sm">-없이 숫자만 입력</p>
                <input
                  name="phoneNum"
                  value={editableData.phoneNum}
                  onChange={handleInputChange}
                  maxLength={11}
                  className="truncate appearance-none border rounded py-2 px-1 font-normal text-sm text-gray-700 leading-tight focus:outline-none"
                />
              </div>
            </div>
          </div>
          <div className="w-full gap-3 flex justify-center p-2">
            <button
              type="submit"
              disabled={!hasChanges}
              className={`w-full md:w-1/2 lg:w-1/3 px-4 py-4 ${
                hasChanges
                  ? "bg-blue text-white hover:bg-deepblue"
                  : "bg-gray-400 text-gray-600 cursor-not-allowed"
              }`}
            >
              회원정보수정
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default InfoChange;
