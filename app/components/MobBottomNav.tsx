import Image from "next/image";
import Link from "next/link";
import event from "/public/images/icon/event.png";
import home from "/public/images/icon/home.png";
import partnerIcon from "/public/images/partnerIcon.png";
import login from "/public/images/icon/login.png";

const MobBottomNav: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <nav className="border-solid border-t border-gray-200 fixed bottom-0 left-0 right-0 bg-white md:hidden">
      <div className="flex justify-around items-center p-2">
        <Link href="/" className="flex flex-col justify-center items-center">
          <Image src={home} width={20} height={20} alt="menuIcon" />
          <span className="text-sm">홈</span>
        </Link>
        <Link
          href="/partner"
          className="flex flex-col justify-center items-center"
        >
          <Image src={partnerIcon} width={20} height={20} alt="menuIcon" />
          <span className="text-sm">파트너</span>
        </Link>
        <Link
          href="/event"
          className="flex flex-col justify-center items-center"
        >
          <Image src={event} width={20} height={20} alt="menuIcon" />
          <span className="text-sm">이벤트</span>
        </Link>
        <Link
          href="/login"
          className="flex flex-col justify-center items-center"
        >
          <Image src={login} width={20} height={20} alt="menuIcon" />
          <span className="text-sm">로그인</span>
        </Link>
      </div>
    </nav>
  );
};

export default MobBottomNav;
