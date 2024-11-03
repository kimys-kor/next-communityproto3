"use client";

import Image from "next/image";
import Avatarimg from "/public/images/avatar.png";

const Avatar = () => {
  return (
    <Image
      className="rounded-full"
      src={Avatarimg}
      width={40}
      height={40}
      alt="avatar"
    ></Image>
  );
};

export default Avatar;
