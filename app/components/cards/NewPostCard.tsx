import Link from "next/link";
import NewIcon from "../NewIcon";
import { BoardItem } from "@/app/types";

const fetchBoardList = async () => {
  const page = 0;
  const size = 5;

  const response = await fetch(
    `${process.env.API_URL}/guest/newList?page=${page}&size=${size}`,
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
  return data.data.content as BoardItem[]; // Cast to BoardItem array
};

const NewPostCard = async () => {
  const boardList = await fetchBoardList();

  return (
    <div className="w-full rounded-md bg-white font-semibold border-solid border-slate-200 border">
      <div className="h-11 px-3 leading-8 flex justify-between items-center border-solid border-b border-gray-200">
        <div className="flex gap-2 justify-center items-center">
          <h1 className="text-lg font-bold">최근글</h1>
        </div>
        {/* <div className="group cursor-pointer bg-semiblue w-6 h-6 flex justify-center items-center rounded-full hover:bg-blue">
          <svg
            width="13"
            height="13"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            className="fill-current text-blue group-hover:text-white transition-colors cursor-pointer"
          >
            <rect x="45" y="10" width="10" height="80" />
            <rect x="10" y="45" width="80" height="10" />
          </svg>
        </div> */}
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
          <div className="flex gap-2">
            <NewIcon />
            <span className="flex justify-start items-center gap-2">
              <Link href={`/post/${item.id}`}>
                <p className="truncate text-sm cursor-pointer hover:underline">
                  {item.title}
                </p>
              </Link>
              <span className="truncate text-[10px] flex justify-center items-center gap-1">
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
            </span>
          </div>
          <p className="text-sm">{item.nickname}</p>
        </div>
      ))}
    </div>
  );
};

export default NewPostCard;
