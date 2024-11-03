"use client";

import PostEditor from "@/app/components/texteditor/PostEditor";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/app/globalStatus/useUserStore";

type EditPostRequest = {
  postId: number;
  title: string;
  content: string;
  notification: boolean;
  thumbNail: string | null;
};

interface EditPostProps {
  postId: number;
  initialTitle: string;
  initialContent: string;
  initialNotification: boolean;
}

const EditPost: React.FC<EditPostProps> = ({
  postId,
  initialTitle,
  initialContent,
  initialNotification,
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [notification, setNotification] = useState(initialNotification);
  const router = useRouter();

  const { userInfo } = useUserStore();

  const handleContentChange = (value: string) => {
    setContent(value);
  };

  const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNotification(e.target.checked);
  };

  const extractThumbnail = (htmlContent: string): string | null => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");
    const imgTag = doc.querySelector("img");
    return imgTag ? imgTag.getAttribute("src") : null;
  };
  const thumbNail = extractThumbnail(content);

  const saveEditedContent = async () => {
    if (!title.trim() || !content.trim()) {
      toast.error("제목과 내용을 입력해주세요.");
      return;
    }

    const postData: EditPostRequest = {
      postId,
      title,
      content,
      notification,
      thumbNail,
    };

    try {
      const response = await fetch("/api/board/changePost", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        toast.success("게시물이 성공적으로 수정되었습니다!");
        router.back();
      } else {
        const result = await response.json();
        toast.error(result.error || "게시물 수정에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error editing post:", error);
      toast.error("오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl py-2">게시물 수정</h1>
      <section className="border-gray-300 flex flex-col gap-3">
        <div className="flex flex-col border-solid border-t">
          {userInfo?.sck && (
            <div className="flex justify-between items-center h-16 border-b border-solid border-gray-200">
              <div className="w-1/3 h-full flex justify-center items-center bg-[#F2F4F9]">
                옵션
              </div>
              <div className="w-full flex justify-center items-center h-10 pl-2">
                <label className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    id="notification"
                    checked={notification}
                    onChange={handleNotificationChange}
                  />
                  공지
                </label>
              </div>
            </div>
          )}
          <div className="flex justify-between items-center h-16 border-b border-solid border-gray-200">
            <div className="w-1/3 h-full flex justify-center items-center bg-[#F2F4F9]">
              제목
            </div>
            <div className="w-full flex justify-center items-center h-10 pl-2">
              <input
                type="text"
                id="title"
                className="truncate appearance-none border border-solid w-[100%] px-7 py-3 text-base text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        <section>
          <PostEditor value={content} onChange={handleContentChange} />
        </section>
        <div className="w-full flex justify-end gap-2">
          <button
            onClick={() => router.back()}
            className="border-solid border border-blue text-blue px-4 py-2 w-24 h-12 hover:bg-indigo-100"
          >
            취소
          </button>
          <button
            onClick={saveEditedContent}
            className="bg-blue text-white px-4 py-2 w-24 h-12 hover:bg-blue"
          >
            수정완료
          </button>
        </div>
      </section>
    </div>
  );
};

export default EditPost;
