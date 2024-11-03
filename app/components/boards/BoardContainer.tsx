import { fetchInitialBoardListData } from "@/app/utils";
import BoardClient from "@/app/components/boards/BoardClient";

interface BoardContainerProps {
  typ: number;
  page: number;
  size: number;
  writeBoolean?: boolean;
}

const BoardContainer = async ({
  writeBoolean = false,
  typ,
  page,
  size,
}: BoardContainerProps) => {
  const {
    content,
    totalElements,
    page: currentPage,
    size: pageSize,
  } = await fetchInitialBoardListData(typ, page - 1, size);

  return (
    <BoardClient
      initialItems={content}
      initialPage={currentPage}
      totalElements={totalElements}
      size={pageSize}
      typ={typ}
      writeBoolean={writeBoolean}
    />
  );
};

export default BoardContainer;
