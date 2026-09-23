import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Proactive AI — 会自己运转的 AI 伙伴 | Prisflow",
  description:
    "以对话为入口，向下扎根插件生态——上下文、工具、LLM Flow 三件套让每个插件自成世界。引擎自动收拾会话、渲染消息 UI、压缩上下文，开发者只管创造。",
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
    <html lang="zh-CN">
      <body className="bg-white font-sans text-neutral-900 antialiased">
        <noscript>
          <style>{`[data-reveal]{opacity:1 !important;transform:none !important}.site-header .header-inner{opacity:1 !important;pointer-events:auto !important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
