import React from "react";
import Title from "../(components)/Title";
import AdminLogHistoryClient from "./(components)/PointHistory.tsx/AdminLogHistoryClient";

export default function Page() {
  return (
    <div className="w-full justify-center flex-col gap-3">
      <main className="w-full flex-col items-center mt-4 overflow-x-auto p-6 sm:p-3">
        <Title title={"관리자 활동 히스토리"}></Title>
        <AdminLogHistoryClient />
      </main>
    </div>
  );
}
