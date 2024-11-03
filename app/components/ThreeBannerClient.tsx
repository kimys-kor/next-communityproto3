"use client";

import Image from "next/image";
import React from "react";
import { Banner } from "@/app/types";

interface ThreeBannerClientProps {
  banners: Banner[];
}

const ThreeBannerClient: React.FC<ThreeBannerClientProps> = ({ banners }) => {
  const handleBannerClick = async (bannerId: number, partnerUrl: string) => {
    try {
      const response = await fetch(`/api/clickBanner?bannerId=${bannerId}`, {
        method: "GET",
      });

      if (response.ok) {
        console.log("Banner click registered");

        // Ensure the URL is absolute
        const formattedUrl =
          partnerUrl.startsWith("http://") || partnerUrl.startsWith("https://")
            ? partnerUrl
            : `https://${partnerUrl}`;

        // Open the URL in a new tab
        window.open(formattedUrl, "_blank");
      } else {
        console.error("Failed to register banner click");
      }
    } catch (error) {
      console.error("Error registering banner click:", error);
    }
  };

  return (
    <section className="mt-3 w-full h-auto shadow-md flex flex-col items-center">
      <ul className="w-full grid grid-cols-2 lg:grid-cols-3">
        {banners.map((banner, index) => (
          <li key={banner.id} className={index === 2 ? "hidden lg:block" : ""}>
            <Image
              src={banner.thumbNail}
              alt={banner.partnerName}
              width={234}
              height={98}
              className="w-full h-auto cursor-pointer"
              onClick={() => handleBannerClick(banner.id, banner.partnerUrl)}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ThreeBannerClient;
