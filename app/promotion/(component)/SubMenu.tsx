import promotion from "/public/images/icon/promotion.png";
import money from "/public/images/icon/money.png";
import people from "/public/images/icon/people.png";
import SubMenuList from "@/app/components/SubMenuList";

function SubMenu() {
  const menuItems = [
    { href: "/promotion", label: "일반홍보", icon: promotion },
    { href: "/promotion/ggong", label: "꽁머니홍보", icon: money },
    { href: "/promotion/hunting", label: "구인구직", icon: people },
  ];

  return <SubMenuList menuItems={menuItems} />;
}

export default SubMenu;
