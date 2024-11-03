import notice from "/public/images/icon/notice.png";
import inquiries from "/public/images/icon/inquiries.png";
import SubMenuList from "@/app/components/SubMenuList";

function SubMenu() {
  const menuItems = [
    { href: "/customer", label: "공지사항", icon: notice },
    { href: "/customer/qalist", label: "1:1문의", icon: inquiries },
  ];

  return <SubMenuList menuItems={menuItems} />;
}

export default SubMenu;
