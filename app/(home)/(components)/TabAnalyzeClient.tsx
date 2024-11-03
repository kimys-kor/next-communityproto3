"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { tabsAnalyze } from "@/app/utils";
import { BoardItem } from "@/app/types";

interface TabAnalyzeClientProps {
  initialTab: number;
  initialData: BoardItem[];
}

export const TabAnalyzeClient: React.FC<TabAnalyzeClientProps> = ({
  initialTab,
  initialData,
}) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [boardList, setBoardList] = useState<BoardItem[]>(initialData);

  useEffect(() => {
    const fetchBoardList = async (typ: number) => {
      try {
        setBoardList([]);

        const response = await fetch(
          `/api/board/list?typ=${typ}&keyword=&page=0&size=5`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error("Error fetching board list");
        }

        const data = await response.json();
        setBoardList(data.data.content);
      } catch (error) {
        console.error("Failed to load board list:", error);
      }
    };

    const typMap = [2, 4, 6, 8];
    const typ = typMap[activeTab];

    fetchBoardList(typ);
  }, [activeTab]);

  return (
    <div className="w-full truncate bg-white rounded-2xl flex flex-col gap-5 border border-solid border-gray-200">
      <div className="w-full flex flex-col">
        {/* Tab buttons */}
        <div className="h-12 px-3 flex justify-start items-center gap-1 rounded-t bg-[#FAFAFA]">
          {tabsAnalyze.map((tab, index) => (
            <div
              key={index}
              className={`border-solid border rounded-2xl cursor-pointer font-semibold text-sm px-2 py-1 transition-all hover:text-blue
                ${activeTab === index ? "text-blue border-blue bg-[#F2F5FF]" : "text-[#999999] border-[#999999]"}`}
              onClick={() => setActiveTab(index)}
            >
              <div className="flex justify-center items-center gap-1">
                {tab.icon}
                {tab.label}
              </div>
            </div>
          ))}
        </div>
        {/* Tab content */}
        <div className="text-sm w-full">
          {boardList.map((item) => (
            <Link
              key={item.id}
              href={
                activeTab === 0
                  ? `/sport/${item.id}`
                  : activeTab === 1
                    ? `/sport/base/${item.id}`
                    : activeTab === 2
                      ? `/sport/basket/${item.id}`
                      : `/sport/volley/${item.id}`
              }
            >
              <div
                className={`px-3 flex justify-between hover:bg-slate-200 hover:cursor-pointer ${
                  item.id !== boardList[boardList.length - 1]?.id
                    ? "border-b border-dashed border-slate-200"
                    : ""
                }`}
              >
                <div className="flex gap-2 items-center p-2">
                  <div className="text-sm font-medium">{item.title}</div>
                </div>
                <div className="flex justify-center items-center">06-13</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
