import photo from "/public/images/icon/photoIgalIcon.png";
import humor from "/public/images/icon/humor.png";
import analyze from "/public/images/icon/analyze.png";
import reasearch from "/public/images/icon/reasearch.png";
import SubMenuList from "@/app/components/SubMenuList";

function SubMenu() {
  const menuItems = [
    { href: "/community", label: "안구정화", icon: photo },
    { href: "/community/humor", label: "유머&이슈", icon: humor },
    { href: "/community/pickster", label: "나는분석왕", icon: analyze },
    { href: "/community/case", label: "피해사례", icon: reasearch },
  ];

  return <SubMenuList menuItems={menuItems} />;
}

export default SubMenu;
