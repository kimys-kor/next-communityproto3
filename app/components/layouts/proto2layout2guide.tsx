import Headers from "@/app/components/layouts/headers/Headers";
import MobBottomNav from "@/app/components/MobBottomNav";

export default function Proto2layout2guide({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Headers></Headers>
      <div className="min-h-[100vh]">{children}</div>
      <MobBottomNav />
    </>
  );
}
