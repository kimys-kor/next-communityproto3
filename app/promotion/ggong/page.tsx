import React from "react";
import ThreeBanner from "@/app/components/ThreeBanner";
import ProgressSliderPage from "@/app/components/ProgressSliderPage";

import Breadcrumb from "@/app/components/BreadCrumb";
import SubMenu from "../(component)/SubMenu";
import BoardContainer from "@/app/components/boards/BoardContainer";
import Direction from "../(component)/Directionggong";

function page() {
  const breadcrumbItems = {
    title: "홍보센터",
    subMenu: "꽁머니홍보",
  };
  return (
    <div className="flex flex-col gap-3 max-w-[1300px]">
      <SubMenu />
      <ThreeBanner></ThreeBanner>
      <ProgressSliderPage></ProgressSliderPage>
      <Breadcrumb breadcrumbData={breadcrumbItems}></Breadcrumb>
      <BoardContainer writeBoolean={true} typ={17} page={1} size={15} />
      <Direction />
    </div>
  );
}

export default page;
