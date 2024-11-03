import Write from "@/app/components/boards/Write";

function Page() {
  return (
    <div className="flex flex-col max-w-[1200px] gap-1">
      <Write postType={18} title={"구인구직"}></Write>
    </div>
  );
}

export default Page;
