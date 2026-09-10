"use client";

/**
 * 极光背景：三团色彩模糊光斑（indigo/violet/emerald）+ 网格。
 * 光斑随滚动做视差位移（ScrollTrigger scrub），呼吸动画常驻。
 */
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function Aurora() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    if (!registered) {
      gsap.registerPlugin(ScrollTrigger);
      registered = true;
    }

    const ctx = gsap.context(() => {
      // 视差：三团光斑以不同速率随滚动下移，产生纵深
      const blobs = gsap.utils.toArray<HTMLElement>("[data-blob]");
      blobs.forEach((blob, i) => {
        gsap.to(blob, {
          yPercent: [18, 42, 30][i % 3],
          ease: "none",
          scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: 1 },
        });
      });
      // 呼吸
      gsap.to(blobs, { scale: 1.15, duration: 6, yoyo: true, repeat: -1, ease: "sine.inOut", stagger: 1.2 });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* 网格底纹 */}
      <div className="absolute inset-0 landing-grid opacity-[0.35]" />
      {/* 光斑 */}
      <div
        data-blob
        className="absolute -top-40 left-[8%] h-[34rem] w-[34rem] rounded-full bg-indigo-600/25 blur-[140px]"
      />
      <div
        data-blob
        className="absolute top-[30%] right-[2%] h-[28rem] w-[28rem] rounded-full bg-violet-600/20 blur-[130px]"
      />
      <div
        data-blob
        className="absolute bottom-[-10%] left-[30%] h-[26rem] w-[26rem] rounded-full bg-emerald-500/12 blur-[130px]"
      />
      {/* 顶部渐隐，与导航融合 */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#05060a] to-transparent" />
    </div>
  );
}
