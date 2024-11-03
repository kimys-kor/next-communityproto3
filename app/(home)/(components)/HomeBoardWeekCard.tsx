import { GrView } from "react-icons/gr";
import Link from "next/link";
import {
  categoryIcons,
  categoryMap,
  getPostUrl,
  fetchBoardWeekContent,
} from "@/app/utils";

const HomeBoardWeekCard = async () => {
  const boardList = await fetchBoardWeekContent();

  return (
    <div>
      <div className="w-full py-2 px-5 rounded-md bg-gradient-to-tl from-lightblue via-white to-lightblue font-semibold border-solid border-slate-200 border flex flex-col gap-1">
        {boardList.map((item, index) => (
          <div
            key={item.id}
            className={`w-full py-2 flex justify-between items-center transition-transform duration-200 ${
              index !== boardList.length - 1
                ? "border-b border-slate-200 border-solid"
                : ""
            } hover:bg-lightblue hover:scale-105`}
          >
            <div className="flex justify-center items-center gap-2">
              <span
                className="flex items-center gap-1 rounded-2xl cursor-pointer text-white text-xs px-[6px] py-[4px] transition-all shadow-lg"
                style={{
                  background: "linear-gradient(45deg, #0038FF, #1494e9)",
                  boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
                }}
              >
                {categoryIcons[item.postType]}
                {categoryMap[item.postType]}
              </span>
              <Link href={getPostUrl(item.postType, item.id)}>
                <p className="text-sm cursor-pointer hover:underline">
                  {item.title}
                </p>
              </Link>
            </div>
            <div className="flex justify-center items-center gap-1">
              <div className="truncate text-xs text-gray-500 flex gap-1 items-center">
                <GrView color="gray" /> {item.hit}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeBoardWeekCard;
