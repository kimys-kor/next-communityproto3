import Breadcrumb from "@/app/components/BreadCrumb";
import React from "react";
import ThreeBanner from "@/app/components/ThreeBanner";
import PhotoBoard from "../components/boards/PhotoBoard";
import SubMenu from "./(component)/SubMenu";
import ProgressSliderPage from "@/app/components/ProgressSliderPage";

function page() {
  const breadcrumbItems = {
    title: "커뮤니티",
    subMenu: "안구정화",
  };

  return (
    <div className="flex flex-col gap-3 max-w-[1200px]">
      <SubMenu />
      <ThreeBanner></ThreeBanner>
      <ProgressSliderPage></ProgressSliderPage>
      <Breadcrumb breadcrumbData={breadcrumbItems}></Breadcrumb>
      <PhotoBoard postType={9} />
    </div>
  );
}

export default page;
