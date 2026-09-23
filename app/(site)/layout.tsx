import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

/** 子页面（博客/联系/条款/隐私）共用布局：传统吸顶导航 + 页脚。首页不经过此布局。 */
export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
