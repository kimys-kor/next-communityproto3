import Proto2layout1 from "../components/layouts/proto2layout1";

export const metadata = {
  title: "꽁머니팡: 홍보센터",
  description: "꽁머니 홍보 꽁머니홍보 구인구직 꽁머니팡 일반홍보 홍보센터",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Proto2layout1 children={children} />;
}
