import { Skeleton, SVGSkeleton } from "./Skeleton";

const HomeBannerSk = () => (
  <>
    <main className="w-full h-auto shadow-md flex flex-col items-center">
      <div className="w-full flex justify-center items-center gap-5 py-3">
        <span>
          <Skeleton className="w-[32px] max-w-full" />
        </span>
        <span>
          <Skeleton className="w-[56px] max-w-full" />
        </span>
      </div>
      <ul className="w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-1">
        <li>
          <SVGSkeleton className="w-full h-auto" />
        </li>
        <li>
          <SVGSkeleton className="w-full h-auto" />
        </li>
        <li>
          <SVGSkeleton className="w-full h-auto" />
        </li>
        <li>
          <SVGSkeleton className="w-full h-auto" />
        </li>
        <li>
          <SVGSkeleton className="w-full h-auto" />
        </li>
        <li>
          <SVGSkeleton className="w-full h-auto" />
        </li>
        <li>
          <SVGSkeleton className="w-full h-auto" />
        </li>
        <li>
          <SVGSkeleton className="w-full h-auto" />
        </li>
        <li>
          <SVGSkeleton className="w-full h-auto" />
        </li>
        <li>
          <SVGSkeleton className="w-full h-auto" />
        </li>
        <li>
          <SVGSkeleton className="w-full h-auto" />
        </li>
        <li>
          <SVGSkeleton className="w-full h-auto" />
        </li>
        <li>
          <SVGSkeleton className="w-full h-auto" />
        </li>
        <li>
          <SVGSkeleton className="w-full h-auto" />
        </li>
        <li>
          <SVGSkeleton className="w-full h-auto" />
        </li>
        <li>
          <SVGSkeleton className="w-full h-auto" />
        </li>
        <li>
          <SVGSkeleton className="w-full h-auto" />
        </li>
        <li>
          <SVGSkeleton className="w-full h-auto" />
        </li>
      </ul>
    </main>
  </>
);

export default HomeBannerSk;
