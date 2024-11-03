import Proto2layout2guide from "../components/layouts/proto2layout2guide";

export const metadata = {
  title: "꽁머니팡: 가이드",
  description: "꽁머니가이드 메이저가이드 안전놀이터가이드 가이드 ",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Proto2layout2guide children={children} />;
}
