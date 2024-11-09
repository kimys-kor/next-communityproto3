import { notFound } from "next/navigation";
import BoardDetailClient from "./BoardDetailClient";
import { fetchInitialBoardContent, fetchInitialComments } from "@/app/utils";

interface BoardDetailProps {
  boardId: string;
}

const BoardDetail: React.FC<BoardDetailProps> = async ({ boardId }) => {
  if (!boardId) {
    return notFound();
  }

  try {
    const boardContent = await fetchInitialBoardContent(boardId);
    const initialCommentsData = await fetchInitialComments(boardId, 0, 12);

    if (!boardContent || !initialCommentsData) {
      return notFound();
    }

    return (
      <div>
        <BoardDetailClient
          content={boardContent}
          boardId={boardId}
          initialCommentsData={initialCommentsData}
        />
      </div>
    );
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return notFound();
  }
};

export default BoardDetail;