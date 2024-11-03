import BoardDetail from "@/app/components/boards/BoardDetail";
import ProgressSliderPage from "@/app/components/ProgressSliderPage";

function page() {
  return (
    <div className="flex flex-col max-w-[1300px]">
      <ProgressSliderPage></ProgressSliderPage>
      <BoardDetail></BoardDetail>
    </div>
  );
}

export default page;
