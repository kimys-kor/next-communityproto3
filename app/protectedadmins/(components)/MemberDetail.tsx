import React, { useState } from "react";

type Member = {
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

type MemberDetailProps = {
  member: Member;
  onBack: () => void;
};

function MemberDetail({ member, onBack }: MemberDetailProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    fullName: member.fullName,
    nickname: member.nickname,
    phoneNum: member.phoneNum,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setFormData({
      password: "",
      fullName: member.fullName,
      nickname: member.nickname,
      phoneNum: member.phoneNum,
    });
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        username: member.username,
        ...formData,
      };

      const response = await fetch("/api/admin/updateUserinfo", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("회원 정보가 성공적으로 업데이트되었습니다.");
        window.location.reload();
      } else {
        alert("업데이트 중 오류가 발생했습니다.");
      }
    } catch (error) {
      console.error("Error updating user information:", error);
    }
  };

  return (
    <div className="p-4 bg-white rounded-md border border-gray-300 shadow-sm max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        회원 상세 정보
      </h2>
      <div className="space-y-3 text-gray-700">
        <div className="flex items-center justify-between">
          <p>
            <strong>ID:</strong> {member.id}
          </p>
          <button
            onClick={handleEditClick}
            className="px-3 py-1 text-sm bg-indigo-600 text-white rounded-md"
          >
            정보 수정
          </button>
        </div>
        <p>
          <strong>아이디:</strong> {member.username}
        </p>

        {isEditing ? (
          <>
            <div>
              <label className="block font-medium mb-1 text-indigo-700">
                비밀번호 (수정 시 입력)
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="새 비밀번호를 입력하세요"
                className="w-full p-2 border border-green-300 rounded bg-green-50"
              />
            </div>
            <div>
              <label className="block font-medium mb-1 text-indigo-700">
                전화번호
              </label>
              <input
                type="text"
                name="phoneNum"
                value={formData.phoneNum}
                onChange={handleInputChange}
                className="w-full p-2 border border-green-300 rounded bg-green-50"
              />
            </div>
            <div>
              <label className="block font-medium mb-1 text-indigo-700">
                이름
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full p-2 border border-green-300 rounded bg-green-50"
              />
            </div>
            <div>
              <label className="block font-medium mb-1 text-indigo-700">
                닉네임
              </label>
              <input
                type="text"
                name="nickname"
                value={formData.nickname}
                onChange={handleInputChange}
                className="w-full p-2 border border-green-300 rounded bg-green-50"
              />
            </div>
            <div className="mt-4 flex space-x-2">
              <button
                onClick={handleCancelClick}
                className="w-full px-4 py-2 bg-gray-500 text-white rounded-md"
              >
                취소
              </button>
              <button
                onClick={handleSubmit}
                className="w-full px-4 py-2 bg-green-600 text-white rounded-md"
              >
                저장
              </button>
            </div>
          </>
        ) : (
          <>
            <p>
              <strong className="text-indigo-700">전화번호:</strong>{" "}
              {member.phoneNum}
            </p>
            <p>
              <strong className="text-indigo-700">이름:</strong>{" "}
              {member.fullName}
            </p>
            <p>
              <strong className="text-indigo-700">닉네임:</strong>{" "}
              {member.nickname}
            </p>
          </>
        )}

        <p>
          <strong>포인트:</strong> {member.point}
        </p>
        <p>
          <strong>경험치:</strong> {member.exp}
        </p>
        <p>
          <strong>상태:</strong> {member.status}
        </p>
        <p>
          <strong>생성 날짜:</strong> {member.createdDt}
        </p>
        <p>
          <strong>마지막 로그인:</strong> {member.lastLogin || "모름"}
        </p>
      </div>
      <button
        onClick={onBack}
        className="mt-6 w-full px-4 py-2 bg-gray-600 text-white rounded-md"
      >
        목록으로 돌아가기
      </button>
    </div>
  );
}

export default MemberDetail;
