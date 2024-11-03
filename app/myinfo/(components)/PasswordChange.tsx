"use client";
import React, { useState } from "react";

function PasswordChange() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});

  const isPasswordValid =
    newPassword.length >= 8 &&
    /[A-Za-z]/.test(newPassword) &&
    /\d/.test(newPassword);
  const hasErrors = () => {
    const validationErrors: { [key: string]: string | null } = {};

    if (!oldPassword)
      validationErrors.oldPassword = "현재 비밀번호를 입력하세요.";
    if (!newPassword)
      validationErrors.newPassword = "새 비밀번호를 입력하세요.";
    if (newPassword.length < 8)
      validationErrors.newPassword = "비밀번호는 8자 이상이어야 합니다.";
    if (!isPasswordValid)
      validationErrors.newPassword =
        "영문과 숫자를 포함한 비밀번호를 입력하세요.";
    if (confirmPassword !== newPassword)
      validationErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";

    setErrors(validationErrors);
    return Object.values(validationErrors).some((error) => error !== null);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (hasErrors()) return;

    try {
      const response = await fetch("/api/user/updatepw", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          oldpassword: oldPassword,
          newpassword: newPassword,
        }),
      });

      if (!response.ok) throw new Error("비밀번호 변경에 실패했습니다.");
      alert("비밀번호가 성공적으로 변경되었습니다!");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setErrors({});
      window.location.href = `/`;
    } catch (error) {
      console.error("Update error:", error);
      alert("비밀번호 변경 중 오류가 발생했습니다. 다시 시도해주세요.");
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
              비밀번호 수정
            </p>
            <div className="w-full flex flex-col gap-3 p-2">
              <p className="w-24">현재 비밀번호</p>
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="truncate appearance-none border rounded py-2 px-1 font-normal text-sm text-gray-700 leading-tight focus:outline-none"
              />
              {errors.oldPassword && (
                <p className="text-warnigtext text-xs">{errors.oldPassword}</p>
              )}
            </div>
            <div className="mt-3 flex flex-col gap-3">
              <div className="w-full flex flex-col gap-3 p-2">
                <p className="w-24">새 비밀번호</p>
                <p className="text-subtext2 text-sm">
                  영문,숫자를 포함한 8자 이상의 비밀번호
                </p>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="truncate appearance-none border rounded py-2 px-1 font-normal text-sm text-gray-700 leading-tight focus:outline-none"
                />
                {errors.newPassword && (
                  <p className="text-warnigtext text-xs">
                    {errors.newPassword}
                  </p>
                )}
              </div>
              <div className="w-full flex flex-col gap-3 p-2">
                <p className="w-24">비밀번호 확인</p>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="truncate appearance-none border rounded py-2 px-1 font-normal text-sm text-gray-700 leading-tight focus:outline-none"
                />
                {errors.confirmPassword && (
                  <p className="text-warnigtext text-xs">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="w-full gap-3 flex justify-center p-2">
            <button
              type="submit"
              disabled={!isPasswordValid || newPassword !== confirmPassword}
              className={`w-full md:w-1/2 lg:w-1/3 px-4 py-4 ${
                isPasswordValid && newPassword === confirmPassword
                  ? "bg-blue text-white hover:bg-deepblue"
                  : "bg-gray-400 text-gray-600 cursor-not-allowed"
              }`}
            >
              비밀번호 변경
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PasswordChange;
