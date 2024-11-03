import ThreeBanner from "@/app/components/ThreeBanner";
import sportMain from "/public/images/sportMain.png";
import Image from "next/image";
import Breadcrumb from "@/app/components/BreadCrumb";
import SubMenu from "@/app/event/(component)/SubMenu";
import BoardContainer from "@/app/components/boards/BoardContainer";

export default function Page() {
  const breadcrumbItems = {
    title: "이벤트",
    subMenu: "포인트교환",
  };

  return (
    <div className="flex flex-col gap-3 max-w-[1300px]">
      {/* <SubMenu />
      <ThreeBanner />
      <div>
        <Image
          className=""
          src={sportMain}
          width={1024}
          height={177}
          alt={"스포츠분석"}
        />
      </div>
      <Breadcrumb breadcrumbData={breadcrumbItems}></Breadcrumb>
      <BoardContainer typ={15} page={1} size={15} /> */}
    </div>
  );
}
