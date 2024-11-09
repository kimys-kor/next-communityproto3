import BoardDetail from "@/app/components/boards/BoardDetail";
import ProgressSliderPage from "@/app/components/ProgressSliderPage";

interface boardDetailPageProps {
  params: { boardId: string };
}

const page: React.FC<boardDetailPageProps> = ({ params }) => {
  const { boardId } = params;
  return (
    <div className="flex flex-col max-w-[1300px]">
      <ProgressSliderPage></ProgressSliderPage>
      <BoardDetail boardId={boardId} />
    </div>
  );
}

export default page;
