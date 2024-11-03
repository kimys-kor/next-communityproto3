"use client";
import React, { useState } from "react";

function DeleteAccount() {
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isPasswordFilled = password.trim() !== "";

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isPasswordFilled) {
      alert("비밀번호를 입력해주세요.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/user/deleteAccount", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete account");
      }

      const result = await response.json();
      console.log("Account deletion successful:", result);
      alert("계정이 성공적으로 삭제되었습니다.");

      window.location.href = "/";
    } catch (error) {
      console.error("Account deletion error:", error);
      alert("계정 삭제 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-full flex flex-col gap-10 justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col items-center gap-3"
        >
          <div className="w-full md:w-1/2 lg:w-1/3 px-3 md:px-0">
            <p className="py-3 font-semibold text-lg border-solid border-b border-[#F3F3F3]">
              회원 탈퇴
            </p>
            <div className="w-full flex flex-col gap-3 p-2">
              <p className="w-24">현재 비밀번호</p>
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                className="truncate appearance-none border rounded py-2 px-1 font-normal text-sm text-gray-700 leading-tight focus:outline-none"
              />
            </div>
          </div>
          <div className="w-full gap-3 flex justify-center p-2">
            <button
              type="submit"
              disabled={!isPasswordFilled || isSubmitting}
              className={`w-full md:w-1/2 lg:w-1/3 px-4 py-4 ${
                isPasswordFilled
                  ? "bg-blue text-white hover:bg-deepblue"
                  : "bg-gray-400 text-gray-600 cursor-not-allowed"
              }`}
            >
              회원 탈퇴
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DeleteAccount;
