import Write from "@/app/components/boards/Write";

function Page() {
  return (
    <div className="flex flex-col max-w-[1200px] gap-1">
      <Write postType={17} title={"꽁머니"}></Write>
    </div>
  );
}

export default Page;
