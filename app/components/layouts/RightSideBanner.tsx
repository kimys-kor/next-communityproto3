import side1 from "/public/images/side1.png";
import side2 from "/public/images/side2.png";
import Image from "next/image";

function RightSideBanner() {
  return (
    <aside className="absolute top-40 right-[-150px] hidden xxl:flex flex-col gap-2 max-w-[150px]">
      <Image
        width={150}
        height={400}
        src={side1}
        alt={"content post Date Icon"}
      />
      <Image
        width={150}
        height={400}
        src={side2}
        alt={"content post Date Icon"}
      />
    </aside>
  );
}

export default RightSideBanner;
