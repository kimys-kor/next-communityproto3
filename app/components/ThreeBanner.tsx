import React from "react";
import ThreeBannerClient from "./ThreeBannerClient";
import { fetchThreeBanner } from "@/app/utils";
import { Banner } from "@/app/types";

async function ThreeBanner() {
  const banners: Banner[] = await fetchThreeBanner();

  return <ThreeBannerClient banners={banners} />;
}

export default ThreeBanner;
