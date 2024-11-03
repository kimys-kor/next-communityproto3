import MobBottomNav from "@/app/components/MobBottomNav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <MobBottomNav />
    </>
  );
}
