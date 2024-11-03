import Proto2layout1 from "../components/layouts/proto2layout1";

export const metadata = {
  title: "꽁머니팡: 고객센터",
  description: "고객센터 공지사항 1:1문의 꽁머니팡고객센터 꽁머니팡공지사항 ",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Proto2layout1 children={children} />;
}
