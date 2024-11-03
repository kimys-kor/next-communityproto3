import React from "react";
import HomeBannerClient from "./HomeBannerClient";
import { fetchHomeBanner } from "@/app/utils";
import { Banner } from "@/app/types";

export default async function HomeBanner() {
  const banners: Banner[] = await fetchHomeBanner();

  return <HomeBannerClient banners={banners} />;
}
