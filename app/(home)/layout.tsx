import Container from "@/app/components/Container";
import Footer from "@/app/components/layouts/Footer";
import RightSideBanner from "@/app/components/layouts/RightSideBanner";
import Login from "@/app/components/login/Login";

import Headers from "@/app/components/layouts/headers/Headers";
import NoticeCard from "@/app/components/cards/NoticeCard";
import NewPostCard from "@/app/components/cards/NewPostCard";
import NewPartnerCard from "@/app/components/cards/NewPartnerCard";
import MobBottomNav from "@/app/components/MobBottomNav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Headers></Headers>
      <div className="min-h-[100vh]">
        <Container>
          <aside className="md:w-1/4 mt-40 hidden md:flex flex-col gap-10 max-w-[300px] h-full">
            <Login></Login>

            <NoticeCard />
            <NewPostCard />
            <NewPartnerCard />
            {/* <IconTabs></IconTabs> */}
          </aside>
          <section className="w-full mt-36 mmd:mt-28 md:mt-36 md:w-3/4">
            {children}
          </section>
          <RightSideBanner></RightSideBanner>
        </Container>
      </div>
      <Footer />
      <MobBottomNav />
    </>
  );
}
