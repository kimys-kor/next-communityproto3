import Proto2layout1 from "../components/layouts/proto2layout1";

export const metadata = {
  title: "꽁머니팡: 스포츠분석",
  description:
    "분석 스포츠분석 해외축구분석 아시아축구분석 MLB분석 KBO분석 NPB분석 NBA분석 농구분석 배구분석",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Proto2layout1 children={children} />;
}
