import Write from "@/app/components/boards/Write";

function Page() {
  return (
    <div className="flex flex-col max-w-[1200px] gap-1">
      <Write postType={16} title={"일반홍보"}></Write>
    </div>
  );
}

export default Page;
