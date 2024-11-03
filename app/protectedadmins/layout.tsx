import React from "react";
import AdminSide from "./(components)/AdminSide";
import MobileSidebar from "./(components)/MobileSidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="min-h-[100vh] flex-col relative">
        {/* Header */}
        <header className="h-[72px] hidden md:flex items-center p-4 bg-gray-800 text-white">
          <h1 className="ml-4 text-lg font-semibold">꽁머니팡 관리자</h1>
        </header>

        {/* Main Container */}
        <div className="w-full flex relative">
          {/* Sidebar */}
          <aside className="hidden md:flex flex-col gap-10 w-[200px] min-h-[100vh]">
            <AdminSide />
          </aside>

          {/* Main Content Section */}
          <section className="flex-grow overflow-x-auto min-h-[100vh]">
            <MobileSidebar />
            {children}
          </section>
        </div>
      </div>
    </>
  );
}
