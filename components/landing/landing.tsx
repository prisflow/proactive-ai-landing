"use client";

/**
 * ProactiveAI 首页 —— 「白之序」风格：
 * 白底严肃、居中 logo；滚动时 hero logo 沿"顶栏落点"位移缩小（动效围绕滚动后 logo 的相对位置）。
 * 内容 = 博客目录（侧边）+ 文章正文（客户端切换，构建期已注入全部 HTML）。
 * 无 GSAP / 无额外依赖：CSS 初态 + JS 逐个显现，rAF 节流写 transform/opacity。
 */

import { useEffect, useRef, useState } from "react";
import type { RenderedPost } from "@/lib/blog";
import { Mermaid } from "@/components/mermaid";

const DEMO_URL = process.env.NEXT_PUBLIC_DEMO_URL || "#";
const REPO_URL = "https://github.com/prisflow/proactive-ai-desktop";

/** 官方棱形标记（恢复自 public/prisflow-favicon.svg，currentColor 随主题） */
function Mark({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 1024 1024" aria-hidden>
      <path fill="currentColor" d="M507,270.9c17.5,0,34.5,0.2,51.5-0.1c5.1-0.1,7.7,1.8,10.2,6c34.7,60,69.6,119.9,104.3,179.8 c30.4,52.5,60.6,105,90.9,157.6c0.7,1.3,1.8,2.4,1.4,4.2c-1.5,1.5-3.4,0.9-5.1,0.9c-33.7,0-67.3-0.1-101,0 c-4,0-6.3-1.4-8.3-4.8c-29.5-50.7-59.1-101.3-88.7-151.9c-28.1-48-56.3-96-84.5-144c-8.3-14.1-16.5-28.1-24.8-42.2 c-0.7-1.3-1.3-2.6-2.7-5.5C469.6,270.9,488,270.9,507,270.9z" />
      <path fill="currentColor" d="M472,755.2c-44.2,0-87.9,0-131.3,0c-0.9-3,0.3-4.4,1.1-5.7c17.8-30.9,35.7-61.7,53.4-92.7 c2.2-3.8,5-4.1,8.7-4.1c123.6,0,247.3,0,371,0c3.8,0,7.6-0.5,11.2,0.4c0.9,1.7-0.2,2.8-0.8,3.9c-18.4,31.3-36.8,62.6-55,93.9 c-2.2,3.7-5,4.2-8.7,4.2C638.5,755.2,555.5,755.2,472,755.2z" />
      <path fill="currentColor" d="M376.2,623.1c-24.5,43.8-48.7,87.2-72.8,130.1c-2.6,0.3-3.2-1-3.9-2.1 c-19.4-31.3-38.8-62.6-58.3-93.8c-1.9-3-1.8-5.1-0.1-8.1c45.8-77.2,91.5-154.5,137.3-231.8c19.2-32.4,38.3-64.8,57.5-97.2 c0.7-1.1,1.6-2.1,2.3-3.1c2.3,0.3,2.7,2.1,3.5,3.5c17,29.2,33.9,58.5,51.1,87.7c1.8,3.1,0.8,5.2-0.6,7.8 c-17.6,31.4-35.2,62.8-52.8,94.2C418.3,547.8,397.3,585.3,376.2,623.1z" />
    </svg>
  );
}

export function Landing({ posts }: { posts: RenderedPost[] }) {
  const heroBoxRef = useRef<HTMLDivElement>(null);
  const heroInnerRef = useRef<HTMLDivElement>(null);
  const headerLogoRef = useRef<HTMLDivElement>(null);
  const articleRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(posts[0]?.slug ?? "");
  const [activeHeading, setActiveHeading] = useState("");
  const activePost = posts.find((p) => p.slug === active) ?? posts[0];

  // 切换文章：更新内容并平滑回到文章开头（reduced-motion 用户直接跳转）
  const selectPost = (slug: string) => {
    if (slug === active) return;
    setActive(slug);
    setActiveHeading("");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    requestAnimationFrame(() => {
      articleRef.current?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    });
  };

  useEffect(() => {
    const html = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) html.classList.add("reduced");

    // ---- 滚动编排：hero logo 沿顶栏落点位移缩小；与门户同一套时序 ----
    let raf = 0;
    const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const s = window.scrollY;
        const heroBox = heroBoxRef.current;
        const heroInner = heroInnerRef.current;
        const headerLogo = headerLogoRef.current;
        if (!heroBox || !heroInner || !headerLogo) return;

        if (!reduced) {
          const heroH = heroBox.offsetHeight || 1;
          // 编排压缩在前 42% 滚动内完成
          const p = clamp01(s / (heroH * 0.42));
          const r = heroBox.getBoundingClientRect();
          const heroCenterY = r.top + r.height / 2;
          const headerCenterY =
            headerLogo.getBoundingClientRect().top + headerLogo.offsetHeight / 2;
          const dy = (headerCenterY - heroCenterY) * p;
          const scale = 1 - 0.72 * p;
          heroInner.style.transform = `translateY(${dy.toFixed(1)}px) scale(${scale.toFixed(3)})`;
          // hero logo 在抵达落点前完全淡出，顶栏 logo 之后才出现——不同屏，杜绝重影
          const q = clamp01((s - heroH * 0.26) / (heroH * 0.16));
          heroInner.style.opacity = String(1 - q);
        }
        const heroH2 = heroBoxRef.current?.offsetHeight || 0;
        html.classList.toggle("header-on", s > heroH2 * 0.44);
        html.classList.toggle("hint-off", s > heroH2 * 0.12);

        // ---- 左侧章节目录：高亮当前读到的标题（视口 40% 线以上最近的 h2/h3） ----
        const article = articleRef.current;
        if (article) {
          const vh = window.innerHeight || 1;
          let current = "";
          article.querySelectorAll("h2[id], h3[id]").forEach((n) => {
            if (n.getBoundingClientRect().top < vh * 0.4) current = n.id;
          });
          setActiveHeading((prev) => (prev === current ? prev : current));
        }
      });
    };

    // ---- 入场 reveal：双 rAF 确保初态已绘制 ----
    const els = Array.from(document.querySelectorAll("[data-reveal]"));
    if (reduced) {
      els.forEach((el) => el.classList.add("is-in"));
    } else {
      requestAnimationFrame(() =>
        requestAnimationFrame(() => els.forEach((el) => el.classList.add("is-in"))),
      );
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {/* 顶栏：logo 收拢后的落点（居中）+ 右侧导航 */}
      <header className="site-header">
        <div className="header-inner relative mx-auto flex h-[68px] max-w-6xl items-center justify-end px-6 md:px-10">
          <div
            ref={headerLogoRef}
            className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2"
          >
            <Mark size={22} />
            <span className="text-[13px] font-semibold tracking-[0.28em]">PROACTIVE AI</span>
          </div>
          <nav className="flex items-center gap-6 text-xs text-muted-foreground">
            <a href="#blog" className="transition-colors hover:text-neutral-900">博客</a>
            <a href={DEMO_URL} className="transition-colors hover:text-neutral-900">下载</a>
          </nav>
        </div>
        <div className="header-line mx-auto h-px max-w-6xl bg-neutral-200" />
      </header>

      <main className="relative z-10">
        {/* Hero：居中 logo（满屏——初始视口只属于 logo，博客不探头） */}
        <section className="relative flex h-[100svh] min-h-[560px] flex-col items-center justify-center px-6">
          <div ref={heroBoxRef} className="flex flex-col items-center text-center">
            <div ref={heroInnerRef} className="hero-logo-inner flex flex-col items-center">
              <span data-reveal style={{ "--d": "0.05s" } as React.CSSProperties} className="text-neutral-900">
                <Mark size={52} />
              </span>
              <h1
                data-reveal
                style={{ "--d": "0.18s" } as React.CSSProperties}
                className="mt-7 select-none text-4xl font-semibold tracking-[0.18em] text-neutral-900 md:text-6xl"
              >
                PROACTIVE AI
              </h1>
              <p
                data-reveal
                style={{ "--d": "0.3s" } as React.CSSProperties}
                className="mt-5 text-xs tracking-[0.42em] text-neutral-500 md:text-sm"
              >
                会 自 己 运 转 的 AI 伙 伴
              </p>
            </div>
          </div>

          {/* 滚动提示 */}
          <div
            data-reveal
            style={{ "--d": "0.6s" } as React.CSSProperties}
            className="scroll-hint absolute bottom-10 flex flex-col items-center gap-3"
          >
            <span className="font-mono text-[10px] tracking-[0.34em] text-neutral-500">SCROLL</span>
            <span className="hint-line block h-10 w-px bg-neutral-400/60" />
          </div>
        </section>

        {/* 博客：正文居中；目录吸顶于左侧留白（仅博客区在视口时存在），窄屏用顶部横滑条 */}
        <section id="blog" className="relative px-6 pb-28 pt-4 md:pb-40">
          <div data-reveal className="mx-auto flex max-w-3xl items-baseline justify-between">
            <p className="font-mono text-[11px] tracking-[0.3em] text-neutral-500">博客 / BLOG</p>
            <p className="font-mono text-[11px] tracking-[0.2em] text-neutral-500">
              {posts.length} 篇 · 产品动态与技术分享
            </p>
          </div>

          {/* 章节目录轨道：绝对定位锚在博客 section 左缘留白（高度=整个博客区，不占正文布局）。
              内层 sticky 吸顶：仅博客区在视口时存在；滚动条隐藏（悬停滚轮仍可滚动）。
              内容 = 当前文章的标题树，滚动跟随高亮，点击平滑滚到对应章节 */}
          <div className="pointer-events-none absolute inset-y-0 left-[calc(50%-40rem)] hidden w-52 min-[1440px]:block">
            <nav
              data-reveal
              aria-label="章节目录"
              className="pointer-events-auto sticky top-24 max-h-[70vh] overflow-y-auto border-l border-neutral-200 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {(activePost?.headings ?? []).map((h) => {
                const isActive = h.slug === activeHeading;
                return (
                  <button
                    key={h.slug}
                    onClick={() =>
                      document.getElementById(h.slug)?.scrollIntoView({ behavior: "smooth", block: "start" })
                    }
                    className={`relative block w-full py-2 text-left transition-colors ${
                      h.level === 3 ? "pl-10" : "pl-5"
                    } pr-2 ${isActive ? "text-neutral-900" : "text-neutral-400 hover:text-neutral-700"}`}
                  >
                    {/* 激活竖条：覆盖在贯通线上 */}
                    {isActive && (
                      <span
                        aria-hidden
                        className="absolute -left-px top-1/2 h-[calc(100%-14px)] w-[2px] -translate-y-1/2 bg-neutral-900"
                      />
                    )}
                    <span className={`text-[13px] leading-snug ${isActive ? "font-medium" : ""}`}>{h.text}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* 时间轴（右缘）：默认只显示细线+圆点骨架，悬停滑出日期+标题；点击切换文章并回到文章开头 */}
          <div className="group fixed right-0 top-1/2 z-20 hidden -translate-y-1/2 min-[1440px]:block">
            {/* 悬停触发带（透明，占住右缘） */}
            <div aria-hidden className="absolute right-0 top-1/2 h-64 w-12 -translate-y-1/2" />
            {/* 收起态提示：竖线 + 竖排小字 */}
            <span
              aria-hidden
              className="absolute right-5 top-1/2 h-40 w-px -translate-y-1/2 bg-neutral-300 transition-colors duration-300 group-hover:bg-transparent"
            />
            <span className="absolute right-1.5 top-1/2 -translate-y-1/2 rotate-90 font-mono text-[10px] tracking-[0.3em] text-neutral-400 transition-opacity duration-300 group-hover:opacity-0">
              POSTS
            </span>
            {/* 面板：收起时藏在右缘外，hover 滑入 */}
            <div className="absolute right-6 top-1/2 -translate-y-1/2 translate-x-4 max-h-[70vh] overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden border-l border-neutral-300 py-2 pl-0 pr-5 opacity-0 transition-all duration-300 pointer-events-none group-hover:translate-x-0 group-hover:opacity-100 group-hover:pointer-events-auto">
              {posts.map((p) => {
                const isActive = p.slug === active;
                return (
                  <button
                    key={p.slug}
                    onClick={() => selectPost(p.slug)}
                    className="group/item relative block w-72 py-2.5 pl-6 pr-2 text-left transition-colors"
                  >
                    {/* 时间轴节点：圆点钉在面板左缘线上 */}
                    <span
                      aria-hidden
                      className={`absolute -left-[3.5px] top-1/2 h-2 w-2 -translate-y-1/2 rounded-full transition-colors ${
                        isActive ? "bg-neutral-900" : "bg-neutral-300 group-hover/item:bg-neutral-500"
                      }`}
                    />
                    <span className="block font-mono text-[10px] text-neutral-400">{p.date}</span>
                    <span
                      className={`mt-0.5 block truncate text-sm leading-snug ${
                        isActive ? "font-medium text-neutral-900" : "text-neutral-500 group-hover/item:text-neutral-800"
                      }`}
                    >
                      {p.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 目录（窄屏）：顶部横滑条；≥1440px 由左侧 fixed 目录接管 */}
          <nav
            data-reveal
            aria-label="博客目录"
            className="mt-10 flex min-[1440px]:hidden gap-1 overflow-x-auto border-l border-neutral-200 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {posts.map((p, i) => {
              const isActive = p.slug === active;
              return (
                <button
                  key={p.slug}
                  onClick={() => selectPost(p.slug)}
                  className={`group relative shrink-0 py-2.5 pl-5 pr-2 text-left transition-colors ${
                    isActive ? "text-neutral-900" : "text-neutral-400 hover:text-neutral-700"
                  }`}
                >
                  {isActive && (
                    <span
                      aria-hidden
                      className="absolute -left-px top-1/2 h-[calc(100%-16px)] w-[2px] -translate-y-1/2 bg-neutral-900"
                    />
                  )}
                  <span className="mr-3 font-mono text-[10px] text-neutral-400">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className={`whitespace-nowrap text-sm leading-snug ${isActive ? "font-medium" : ""}`}>
                    {p.title}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* 正文：居中于整个视口；切换文章时平滑滚回此处 */}
          <article ref={articleRef} data-reveal className="mx-auto mt-10 max-w-3xl scroll-mt-28 md:mt-14">
            <header className="mb-8 border-b border-neutral-200 pb-6">
              <p className="font-mono text-[11px] tracking-[0.2em] text-neutral-400">
                {activePost?.date}
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-neutral-900 md:text-3xl">
                {activePost?.title}
              </h2>
              {activePost?.excerpt && (
                <p className="mt-3 text-sm leading-relaxed text-neutral-500">
                  {activePost.excerpt}
                </p>
              )}
            </header>
            <div
              key={activePost?.slug}
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: activePost?.html ?? "" }}
            />
            {/* mermaid 图渲染：key 随文章切换重挂，重新扫描新文章的 mermaid 块 */}
            <Mermaid key={activePost?.slug} />
          </article>
        </section>

        {/* 页脚：居中 mini logo，呼应首屏 */}
        <footer className="border-t border-neutral-200">
          <div className="mx-auto flex max-w-6xl flex-col items-center px-6 py-14 text-center md:px-10">
            <span data-reveal className="text-neutral-900">
              <Mark size={28} />
            </span>
            <p
              data-reveal
              style={{ "--d": "0.08s" } as React.CSSProperties}
              className="mt-4 text-[13px] font-semibold tracking-[0.28em] text-neutral-900"
            >
              PROACTIVE AI
            </p>
            <nav
              data-reveal
              style={{ "--d": "0.16s" } as React.CSSProperties}
              className="mt-6 flex items-center gap-7 text-xs text-neutral-500"
            >
              <a href={DEMO_URL} className="transition-colors hover:text-neutral-900">
                下载
              </a>
              <a
                href={REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-neutral-900"
              >
                源码
              </a>
              <a href="mailto:wangziyu@prisflow.cn" className="transition-colors hover:text-neutral-900">
                联系我们
              </a>
            </nav>
            <div
              data-reveal
              style={{ "--d": "0.24s" } as React.CSSProperties}
              className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-[10px] tracking-[0.14em] text-neutral-400"
            >
              <a
                href="https://beian.miit.gov.cn/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-neutral-600"
              >
                沪ICP备2026028440号
              </a>
              <span>© 2026 PRISFLOW</span>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
