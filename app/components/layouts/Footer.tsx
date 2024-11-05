import React from "react";
import Logo from "../Logo";
import Image from "next/image";
import teleIcon from "/public/images/icon/teleIcon.png";

function Footer() {
  return (
    <footer className="max-w-[1300px] mx-auto relative w-full min-h-96 mt-5 border-t border-solid border-gray-200 mb-12 sm:mb-4">
      <div className="w-full h-full absolute bg-footer bottom-0 flex items-center justify-center">
        <div className="w-full flex justify-center items-center px-2 py-4">
          <div>
            <Logo />
            <div className="text-center mt-4 space-y-2">
              <p className="text-xs md:text-sm font-semibold">
                Corporate name 꽁머니팡
              </p>
              <p className="text-xs md:text-sm text-gray-400 leading-5">
                The design and all content of this site are protected under
                copyright law and may not be replicated or misappropriated
                without authorization.
              </p>
              <p className="text-xs md:text-sm text-gray-400 leading-5">
                본 사이트의 디자인 및 모든 저작물은 법적 권리에 의해 보호되고
                있으며, 저작권자의 허락 없이 무단 복제를 금합니다.
              </p>
              <p className="text-xs md:text-sm text-gray-400 leading-5">
                꽁머니팡은 금전요구 및 영업행위를 하지 않습니다. <br />
                꽁머니팡을 사칭하는 텔레그램 및 카카오톡에 유의하시기 바랍니다.
              </p>
              <p className="text-xs md:text-sm mt-3 text-gray-400">
                ⓒ 꽁머니팡. All rights reserved.
              </p>
              <div className="w-full flex justify-center items-center">
                <Image src={teleIcon} width={230} height={60} alt="teleIcon" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
