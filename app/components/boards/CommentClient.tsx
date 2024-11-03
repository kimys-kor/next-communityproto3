"use client";
import { useState, useEffect } from "react";
import Paging from "../Paging";
import { formatDate } from "@/app/utils";
import { Comment } from "@/app/types";
import { useAuthStore } from "@/app/globalStatus/useAuthStore";
import { useUserStore } from "@/app/globalStatus/useUserStore";
import { commentSaveServerAction } from "@/app/api/authAction";
import { FaTrash } from "react-icons/fa";
import { usePathname } from "next/navigation";

interface CommentPageClientProps {
  initialData: {
    comments: Comment[];
    total: number;
  };
  boardId: string;
}

const CommentPageClient: React.FC<CommentPageClientProps> = ({
  initialData,
  boardId,
}) => {
  const size = 5;
  const [comments, setComments] = useState<Comment[]>(initialData.comments);
  const [totalElements, setTotalElements] = useState(initialData.total);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(
    Math.ceil(initialData.total / size)
  );
  const [isLoggedIn, setIsLoggedIn] = useState(
    useAuthStore.getState().loggedIn
  );
  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editedContent, setEditedContent] = useState("");
  const [selectedComments, setSelectedComments] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const { userInfo } = useUserStore();
  const pathname = usePathname();
  const basePath = pathname?.split("/")[1] || "";

  useEffect(() => {
    const unsubscribe = useAuthStore.subscribe((state) => {
      setIsLoggedIn(state.loggedIn);
    });
    return () => unsubscribe();
  }, []);

  const fetchComments = async (page: number) => {
    try {
      const res = await fetch(
        `/api/board/comment?boardId=${boardId}&page=${page - 1}&size=${size}`
      );
      if (!res.ok) throw new Error("Failed to fetch comments");

      const data = await res.json();
      if (data.status === "OK" && data.data) {
        setComments(data.data.comments);
        setTotalElements(data.data.total);
        setTotalPages(Math.ceil(data.data.total / size));
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    fetchComments(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;
    const commentData = {
      boardId,
      username: userInfo?.username || "",
      content: newComment,
    };
    const result = await commentSaveServerAction(commentData);
    if (result.status === "OK") {
      fetchComments(1);
      setCurrentPage(1);
      setNewComment("");
    } else {
      console.error("Failed to submit comment:", result.message);
    }
  };

  const startEditingComment = (id: number, content: string) => {
    setEditingCommentId(id);
    setEditedContent(content);
  };

  const handleEditComment = async () => {
    try {
      const response = await fetch("/api/board/editComment", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editingCommentId, content: editedContent }),
      });
      if (response.ok) {
        fetchComments(currentPage);
        setEditingCommentId(null);
        setEditedContent("");
      } else {
        throw new Error("Failed to edit comment");
      }
    } catch (error) {
      console.error("Error editing comment:", error);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    const confirmed = window.confirm("정말 삭제하시겠습니까?");
    if (!confirmed) return;

    try {
      const response = await fetch(
        `/api/board/deleteMyComment?commentId=${commentId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.ok) {
        alert("댓글이 성공적으로 삭제되었습니다");
        window.location.href = `/${basePath}/${boardId}`;
      } else {
        throw new Error("댓글 삭제 실패");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("댓글 삭제에 실패했습니다.");
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedComments([]);
    } else {
      setSelectedComments(comments.map((comment) => comment.id));
    }
    setSelectAll(!selectAll);
  };

  const handleSelectComment = (id: number) => {
    setSelectedComments((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((commentId) => commentId !== id)
        : [...prevSelected, id]
    );
  };

  const handleDeleteSelected = async () => {
    if (selectedComments.length === 0) {
      alert("선택한 댓글이 없습니다.");
      return;
    }

    const confirmed = window.confirm("정말 댓글을 삭제 하시겠습니까?");
    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch("/api/board/deleteComment", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idList: selectedComments }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete selected comments");
      }

      setComments((prevComments) =>
        prevComments.filter((comment) => !selectedComments.includes(comment.id))
      );
      setSelectedComments([]);
      setSelectAll(false);
    } catch (error) {
      console.error("Error deleting comments:", error);
      alert("An error occurred while deleting the selected comments.");
    }
  };

  return (
    <div>
      <section className="px-3 py-5 flex flex-col gap-5">
        <div className="flex justify-between items-center text-lg">
          <div>
            총댓글{" "}
            <span className="text-[#2C4AB6] font-semibold">
              {totalElements}
            </span>
          </div>
          {userInfo?.sck && (
            <div className="flex justify-end gap-5">
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
                onClick={handleDeleteSelected}
                className="flex items-center gap-1 text-red-600 text-sm hover:text-red-800"
              >
                <FaTrash />
                <span>삭제</span>
              </button>
            </div>
          )}
        </div>

        {comments.map((item) => {
          const canEditOrDelete =
            userInfo?.sck || userInfo?.username === item.username;

          return (
            <div
              key={item.id}
              className="py-5 flex flex-col gap-3 text-subtext"
            >
              <div className="py-4 px-3 flex justify-between items-center bg-[#f8f9fa] border-t border-solid border-[#ddd]">
                <div className="flex gap-2 items-center">
                  {userInfo?.sck && (
                    <input
                      type="checkbox"
                      checked={selectedComments.includes(item.id)}
                      onChange={() => handleSelectComment(item.id)}
                      className="h-4 w-4 mr-2"
                    />
                  )}
                  <p>{item.nickname}</p>
                </div>
                <div className="flex gap-3 items-center">
                  {canEditOrDelete && (
                    <div className="flex gap-2">
                      {/* <button
                      onClick={() => startEditingComment(item.id, item.content)}
                      className="text-blue hover:text-deepblue"
                    >
                      수정
                    </button> */}
                      <button
                        onClick={() => handleDeleteComment(item.id.toString())}
                        className="text-red-500 hover:text-red-700"
                      >
                        삭제
                      </button>
                    </div>
                  )}
                  <div className="flex gap-2">
                    <p>{formatDate(item.createdDt)}</p>
                  </div>
                </div>
              </div>
              {editingCommentId === item.id ? (
                <div className="flex flex-col gap-2">
                  <textarea
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    className="p-2 bg-white w-full h-16 resize-none border-[#DDDDDD] border border-solid focus:outline-none"
                  />
                  <div className="w-full flex justify-end">
                    <button
                      onClick={handleEditComment}
                      className="w-28 h-10 bg-blue hover:bg-deepblue text-white font-bold rounded focus:outline-none"
                    >
                      저장
                    </button>
                  </div>
                </div>
              ) : (
                <div className="px-3">{item.content}</div>
              )}
            </div>
          );
        })}

        {isLoggedIn ? (
          <div className="py-6 px-4 bg-[#F8F9FA] flex gap-2 rounded-md">
            <textarea
              className="p-2 bg-white w-10/12 h-16 resize-none border-[#DDDDDD] border border-solid focus:outline-none"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            ></textarea>
            <button
              onClick={handleCommentSubmit}
              className="w-2/12 bg-blue text-white font-bold rounded focus:outline-none"
            >
              등록
            </button>
          </div>
        ) : (
          <div className="py-6 px-4 bg-[#F8F9FA] flex flex-col gap-2 rounded-md items-center justify-center border border-[#ddd]">
            <p className="text-red-500 font-semibold">
              로그인을 한 유저만 댓글을 등록할 수 있습니다
            </p>
          </div>
        )}
      </section>
      <Paging
        page={currentPage}
        size={size}
        totalElements={totalElements}
        setPage={handlePageChange}
        scroll={"bottom"}
      />
    </div>
  );
};

export default CommentPageClient;
