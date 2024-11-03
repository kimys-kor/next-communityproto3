import BoardDetail from "@/app/components/boards/BoardDetail";
import ProgressSliderPage from "@/app/components/ProgressSliderPage";
import ThreeBanner from "@/app/components/ThreeBanner";

function page() {
  return (
    <div className="flex flex-col max-w-[1300px]">
      <ProgressSliderPage />
      <ThreeBanner />
      <BoardDetail />
    </div>
  );
}

export default page;
