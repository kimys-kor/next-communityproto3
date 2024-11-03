"use client";
import PostEditor from "@/app/components/texteditor/PostEditor";
import React, { useState } from "react";
import { postSaveServerAction } from "@/app/api/authAction";
import toast from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";

type savePostRequest = {
  postType: number;
  notification: boolean;
  title: string;
  content: string;
  thumbNail: string | null;
};

interface WriteProps {
  title: string;
  postType: number;
}

const Write: React.FC<WriteProps> = ({ title, postType }) => {
  const [content, setContent] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [notification, setNotification] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const basePath = pathname?.replace(/\/write$/, "") || "";

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

  const saveContent = async () => {
    if (!postTitle.trim() || !content.trim()) {
      toast.error("제목과 내용을 입력해주세요.");
      return;
    }

    const thumbNail = extractThumbnail(content);

    const postData: savePostRequest = {
      postType,
      notification: notification || false,
      title: postTitle,
      content: content,
      thumbNail: thumbNail,
    };

    try {
      const result = await postSaveServerAction(postData);

      if (result.status === 401) {
        toast.error("로그인을 해주세요.");
        return;
      }

      if (result.status === "OK") {
        toast.success("게시물이 성공적으로 저장되었습니다!");
        router.push(`${basePath}`);
      } else {
        toast.error("게시물 저장에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error saving post:", error);
      toast.error("오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl py-2">{title} 작성</h1>
      <section className="border-gray-300 flex flex-col gap-3">
        <div className="flex flex-col border-solid border-t">
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
          <div className="flex justify-between items-center h-16 border-solid border-b border-gray-300">
            <div className="w-1/3 h-full flex justify-center items-center bg-[#F2F4F9]">
              제목
            </div>
            <div className="w-full flex justify-center items-center h-10 pl-2">
              <input
                type="text"
                id="title"
                className="truncate appearance-none border border-solid w-[100%] px-7 py-3 text-base text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={postTitle}
                onChange={(e) => setPostTitle(e.target.value)}
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
            onClick={saveContent}
            className="bg-blue text-white px-4 py-2 w-24 h-12 hover:bg-blue"
          >
            작성완료
          </button>
        </div>
      </section>
    </div>
  );
};

export default Write;
