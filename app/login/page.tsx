import ProgressSliderPage from "../components/ProgressSliderPage";

import { Suspense } from "react";
import HomeBannerSk from "../components/skeleton/HomeBannerSk";
import Login from "../components/login/Login";
import ThreeBanner from "../components/ThreeBanner";

function page() {
  return (
    <div>
      <article className="w-full h-full flex flex-col gap-3 lg:gap-10">
        <ThreeBanner />
        <ProgressSliderPage></ProgressSliderPage>
        <div className="w-full flex justify-center items-center">
          <Login />
        </div>

        {/* <MultiResponsiveSlider></MultiResponsiveSlider> */}
      </article>
    </div>
  );
}

export default page;
