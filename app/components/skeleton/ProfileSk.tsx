import { Skeleton, SVGSkeleton } from "./Skeleton";

const ProfileSk = () => (
  <div className="max-w-128 bg-white p-8 rounded-lg w-full border-solid border-slate-200 border">
    <main className="w-full p-2 flex flex-col gap-2 items-center justify-center">
      <Skeleton className="w-8 h-8 rounded-full" />
      <Skeleton className="w-7/12 h-4" />
      <Skeleton className="w-9/12 h-4" />
      <Skeleton className="w-8/12 h-8" />
      <Skeleton className="w-10/12 h-10" />
    </main>
  </div>
);

export default ProfileSk;
