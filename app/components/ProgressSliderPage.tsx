import main_top from "/public/images/main_top.png";
import ProgressSlider from "./ProgressSlider";

export default function ProgressSliderPage() {
  const items = [
    {
      img: main_top,
      desc: "main_banner",
    },
    {
      img: main_top,
      desc: "main_banner",
    },
  ];

  return (
    <main className="relative h-32 md:h-48 flex flex-col justify-center bg-transparent overflow-hidden">
      <div className="max-w-6xl mx-auto py-3">
        <div className="mt-3 flex justify-center bg-[#F2F7FF]">
          <ProgressSlider items={items} />
        </div>
      </div>
    </main>
  );
}
