import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Proactive AI — 会自己切换上下文的 AI 聊天助手 | Prisflow",
  description:
    "对话按「上下文 → 工具 → 静态逻辑 / LLM Flow」组织，UI 消息与文本消息双形态，压缩层按上下文调优，缓存命中率 90% 以上，所有数据本地化。",
  icons: {
    icon: "/prisflow-favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans">
      <noscript>
        <style>{`[data-hero-badge],[data-hero-title] > span,[data-hero-sub],[data-hero-cta] > *,[data-hero-meta] > *,[data-reveal-item]{opacity:1 !important;transform:none !important}`}</style>
      </noscript>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
