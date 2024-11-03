import Image from "next/image";
import logo from "/public/images/logo.png";

const Logo = () => {
  return (
    <Image
      alt="logo"
      className="cursor-pointer"
      width={130}
      height={50}
      src={logo}
    ></Image>
  );
};

export default Logo;
