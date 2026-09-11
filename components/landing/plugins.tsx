"use client";

/**
 * UI 推送组件实况：纯 CSS 模拟修仙状态卡与对话流——所见即插件可推送的全部表达力。
 * 滚动视差：mock 面板轻微位移，制造纵深。
 */
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Reveal } from "./reveal";

let registered = false;

export function Plugins() {
  const mockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mockRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!registered) {
      gsap.registerPlugin(ScrollTrigger);
      registered = true;
    }
    const ctx = gsap.context(() => {
      gsap.to(el, {
        yPercent: -8,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.8 },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section id="plugins" className="relative scroll-mt-20 py-20 md:py-28">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div>
              <div className="text-xs font-medium uppercase tracking-[0.2em] text-blue-600">UI Push</div>
              <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">
                插件推的不是文字，
                <br />
                是一整个界面
              </h2>
              <p className="mt-4 leading-relaxed text-slate-600">
                声明式组件树随对话流推送到前端：状态卡、进度条、彩色徽章、可折叠面板、表格与列表。
                桌面端与手机端同一套协议渲染，玩家在对话框里就能操作完整的插件界面。
              </p>
              <ul className="mt-6 space-y-2.5 text-sm text-slate-600">
                {[
                  "16 个原子组件，Row/Column 自由嵌套布局",
                  "交互回灌：按钮点击/表单提交直接成为下一轮对话输入",
                  "折叠面板：信息密度与阅读体验随手切换",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-blue-500" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* 修仙状态卡 mock（纯 CSS 模拟） */}
          <Reveal delay={0.15}>
            <div ref={mockRef} className="relative">
              <div className="absolute -inset-6 rounded-3xl bg-gradient-to-b from-blue-500/10 to-transparent blur-2xl" />
              <div className="relative rounded-2xl border border-slate-200 bg-white p-5 shadow-xl">
                {/* 卡标题：居中四元 */}
                <div className="text-center text-sm font-medium text-slate-800">
                  陆青禾 · 筑基三层 · 天枢城 · 民国十三年腊月
                </div>
                {/* 徽标行 */}
                <div className="mt-3 flex flex-wrap justify-center gap-1.5">
                  {["🕐 民国十三年", "📍 天枢城", "📈 突破率 12%"].map((t) => (
                    <span key={t} className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] text-slate-600">
                      {t}
                    </span>
                  ))}
                </div>
                {/* 进度条 */}
                <div className="mt-4 space-y-3">
                  {[
                    ["修为", 32, 100, "from-indigo-500 to-violet-500"],
                    ["体力", 78, 100, "from-emerald-500 to-teal-400"],
                  ].map(([label, v, max, grad]) => (
                    <div key={label as string}>
                      <div className="mb-1 flex justify-between text-[10px] text-slate-500">
                        <span>{label}</span>
                        <span>{v}/{max}</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-slate-200">
                        <div
                          className={`h-full rounded-full bg-gradient-to-r ${grad}`}
                          style={{ width: `${((v as number) / (max as number)) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                {/* 资产徽章 */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {["🪙 灵石 12", "⏳ 寿元 78 年", "📖 主修 引气诀"].map((t) => (
                    <span key={t} className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] text-slate-600">
                      {t}
                    </span>
                  ))}
                </div>
                {/* 天资 */}
                <div className="mt-3 rounded-xl border border-slate-200 p-3">
                  <div className="mb-2 text-[10px] uppercase tracking-wider text-slate-400">天资</div>
                  <div className="space-y-1.5">
                    {[
                      ["天生剑骨", "text-emerald-400 border-emerald-500/40 bg-emerald-500/10"],
                      ["道债缠身", "text-red-400 border-red-500/40 bg-red-500/10"],
                    ].map(([n, cls]) => (
                      <div key={n} className="flex items-start gap-2">
                        <span className={`inline-flex shrink-0 items-center rounded-md border px-1.5 py-0.5 text-[10px] font-medium ${cls}`}>
                          {n}
                        </span>
                        <span className="text-[11px] leading-relaxed text-slate-500">剑入凡尘如旧友重逢，修行一日千里。</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
