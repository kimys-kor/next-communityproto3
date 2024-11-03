import ThreeBanner from "@/app/components/ThreeBanner";
import ProgressSliderPage from "@/app/components/ProgressSliderPage";
import Breadcrumb from "@/app/components/BreadCrumb";
import SubMenu from "../(component)/SubMenu";
import BoardContainer from "@/app/components/boards/BoardContainer";

function page() {
  const breadcrumbItems = {
    title: "고객센터",
    subMenu: "1:1문의",
  };

  return (
    <div className="flex flex-col gap-3 max-w-[1300px]">
      <SubMenu />
      <ThreeBanner />
      <div>
        <ProgressSliderPage></ProgressSliderPage>
      </div>
      <Breadcrumb breadcrumbData={breadcrumbItems}></Breadcrumb>
      <BoardContainer typ={20} page={1} size={15} />
    </div>
  );
}

export default page;
