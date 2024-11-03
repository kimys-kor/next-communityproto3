import eventIcon from "/public/images/icon/eventIcon.png";
import pointChangeIcon from "/public/images/icon/pointChangeIcon.png";
import SubMenuList from "@/app/components/SubMenuList";

function SubMenu() {
  const menuItems = [
    { href: "/event", label: "이벤트", icon: eventIcon },
    // { href: "/event/pointchange", label: "포인트교환", icon: pointChangeIcon },
  ];

  return <SubMenuList menuItems={menuItems} />;
}

export default SubMenu;
