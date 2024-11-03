"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import masterIcon from "/public/images/masterIcon.png";
import { BiCommentDetail } from "react-icons/bi";
import { GrView } from "react-icons/gr";
import { LiaThumbsUp, LiaThumbsDown } from "react-icons/lia";
import { HiBars3 } from "react-icons/hi2";
import { formatDate } from "@/app/utils";
import { BoardDetailClientProps, Comment } from "@/app/types";
import DOMPurify from "isomorphic-dompurify";
import { useUserStore } from "@/app/globalStatus/useUserStore";
import EditPost from "./EditPost";
import CommentPageClient from "./CommentClient";
import React, { useState } from "react";

interface BoardDetailClientPropsWithComments extends BoardDetailClientProps {
  boardId: string;
  initialCommentsData: { comments: Comment[]; total: number };
}

const BoardDetailClient: React.FC<BoardDetailClientPropsWithComments> = ({
  content,
  boardId,
  initialCommentsData,
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const basePath = pathname?.split("/")[1] || "";
  const [isEditing, setIsEditing] = useState(false);

  const sanitizedData = () => {
    const contentHtml = content.content || "";
    return { __html: DOMPurify.sanitize(contentHtml) };
  };

  const { userInfo } = useUserStore();
  const canEditOrDelete =
    userInfo?.sck || userInfo?.username === content.username;

  const handleDelete = async () => {
    const confirmed = window.confirm("정말 삭제하시겠습니까?");
    if (!confirmed) return;

    try {
      const response = await fetch(
        `/api/board/deleteMyPost?boardId=${content.id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.ok) {
        alert("게시물이 성공적으로 삭제되었습니다!");
        window.location.href = `/${basePath}`;
      } else {
        throw new Error("게시물 삭제 실패");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("게시물 삭제에 실패했습니다.");
    }
  };
  const handleEditClick = () => {
    setIsEditing(true);
  };

  if (isEditing) {
    return (
      <EditPost
        initialNotification={content.notification}
        postId={content.id}
        initialTitle={content.title}
        initialContent={content.content}
      />
    );
  }

  return (
    <div>
      <section className="flex flex-col gap-1 mt-3">
        <h1 className="font-semibold text-3xl">{content.title}</h1>
        <article className="mt-3 w-full px-3 py-2 flex items-center justify-between gap-1 bg-semiblue">
          <div className="flex items-center gap-1 ">
            {content.username === "master" && (
              <Image src={masterIcon} width={25} height={25} alt="adminIcon" />
            )}
            <p className="font-semibold">{content.nickname}</p>
          </div>
          <div className="flex gap-1 truncate px-2">
            <p className="font-light text-[#2C4AB6]">
              {formatDate(content.createdDt)}
            </p>
          </div>
        </article>
        <article className="px-3 py-2 flex items-center justify-between w-full ">
          <section className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-sm text-subtext">
              <GrView />
              {content.hit}
            </div>
            <div className="flex items-center gap-1 text-sm text-subtext">
              <BiCommentDetail />
              {content.replyNum}
            </div>
            <div className="flex items-center gap-1 text-sm text-subtext">
              <LiaThumbsUp size={20} />
              {content.likes}
            </div>
            <div className="flex items-center gap-1 text-sm text-subtext">
              <LiaThumbsDown size={20} />
              {content.hate}
            </div>
          </section>
          <section className="flex items-center gap-3 text-md">
            {canEditOrDelete && (
              <>
                <button
                  onClick={handleEditClick}
                  className="text-blue hover:text-deepblue"
                >
                  수정
                </button>
                <button
                  onClick={handleDelete}
                  className="text-red-700 hover:text-red-700"
                >
                  삭제
                </button>
              </>
            )}
            <Link href={`/${basePath}`}>
              <div className="flex items-center gap-1 cursor-pointer text-[#6c757d] hover:text-gray-600">
                <HiBars3 size={20} />
                <span>목록</span>
              </div>
            </Link>
          </section>
        </article>
      </section>
      <section className="px-3 py-10 flex flex-col gap-5 ">
        <article dangerouslySetInnerHTML={sanitizedData()}></article>
      </section>
      {/* Conditionally render CommentPageClient only when not editing */}
      {!isEditing && (
        <CommentPageClient
          initialData={initialCommentsData}
          boardId={boardId}
        />
      )}
    </div>
  );
};

export default BoardDetailClient;
