import { headers } from "next/headers";
import { notFound } from "next/navigation";
import BoardDetailClient from "./BoardDetailClient";
import { fetchInitialBoardContent, fetchInitialComments } from "@/app/utils";

const BoardDetail: React.FC = async () => {
  const headersList = headers();
  const headerPathname = headersList.get("x-pathname");
  const id = headerPathname?.split("/").pop() || "";

  if (!id) {
    return notFound();
  }

  const boardContent = await fetchInitialBoardContent(id);
  const initialCommentsData = await fetchInitialComments(id, 0, 12);

  if (!boardContent || !initialCommentsData) {
    return notFound();
  }

  return (
    <div>
      <BoardDetailClient
        content={boardContent}
        boardId={id}
        initialCommentsData={initialCommentsData}
      />
    </div>
  );
};

export default BoardDetail;
