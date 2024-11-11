import Link from "next/link";
import Image from "next/image";
import noticeIcon from "/public/images/icon/noticeIcon.png";
import { BoardItem } from "@/app/types";

const fetchBoardList = async () => {
  const typ = 19;

  const response = await fetch(
    process.env.NEXT_PUBLIC_API_URL + `/guest/list?typ=${typ}&keyword=&page=0&size=5`,
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
  return data.data.content as BoardItem[];
};

const NoticeCard = async () => {
  const boardList = await fetchBoardList();

  return (
    <div className="w-full rounded-md bg-white font-semibold border-solid border-slate-200 border">
      <div className="h-11 px-3 leading-8 flex justify-between items-center border-solid border-b border-gray-200">
        <div className="flex gap-2 justify-center items-center">
          <Image src={noticeIcon} width={27} height={27} alt="menuIcon" />
          <h1 className="text-lg font-bold">공지사항</h1>
        </div>
      </div>
      {boardList.map((item, index) => (
        <div
          key={item.id}
          className={`w-full h-10 px-3 flex justify-between items-center transition-all ${
            index !== boardList.length - 1
              ? "border-b border-dashed border-slate-200"
              : ""
          } hover:bg-blue-50`}
        >
          <div className="flex gap-2 items-center flex-1 overflow-hidden">
            <span
              className="flex items-center gap-1 rounded-2xl cursor-pointer text-white text-xs px-[6px] py-[4px] transition-all shadow-lg"
              style={{
                background: "linear-gradient(45deg, #0070f3, #00d8ff)",
                boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
              }}
            >
              공지사항
            </span>
            <div className="flex-1 min-w-0 flex items-center gap-2 overflow-hidden">
              <Link href={`/post/${item.id}`} className="flex-1 min-w-0">
                <p className="truncate text-sm cursor-pointer hover:underline">
                  {item.title}
                </p>
              </Link>
              <span className="text-[10px] flex items-center gap-1">
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 100 100"
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-current text-subtext3"
                >
                  <rect x="45" y="10" width="10" height="80" />
                  <rect x="10" y="45" width="80" height="10" />
                </svg>
                <span className="text-subtext3 font-bold text-xs">
                  {item.replyNum}
                </span>
              </span>
            </div>
          </div>
          <p className="text-sm truncate w-12 text-right">{item.nickname}</p>
        </div>
      ))}
    </div>
  );
};

export default NoticeCard;