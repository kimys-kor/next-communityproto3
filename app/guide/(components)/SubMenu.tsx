import money from "/public/images/icon/money.png";
import passIcon from "/public/images/passIcon.png";
import question from "/public/images/question.png";
import SubMenuList from "@/app/components/SubMenuList";

function SubMenu() {
  const menuItems = [
    { href: "/guide", label: "꽁머니", icon: money },
    { href: "/guide/major", label: "메이저", icon: question },
    { href: "/guide/safe", label: "안전놀이터", icon: passIcon },
  ];

  return <SubMenuList menuItems={menuItems} />;
}

export default SubMenu;
