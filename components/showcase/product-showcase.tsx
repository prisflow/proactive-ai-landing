"use client";

import { useEffect, useRef } from "react";
import { proactiveShowcase, proactiveSpecs } from "@/lib/showcase";
import { FeatureRow } from "./feature-row";
import { ScreenshotPlate } from "./screenshot-plate";

const DEMO_URL = process.env.NEXT_PUBLIC_DEMO_URL || "#";
const REPO_URL = "https://github.com/prisflow/proactive-ai-desktop";

export function ProductShowcase() {
  const sectionRef = useRef<HTMLElement>(null);

  // 图版进入视口时再擦除显现；现有 data-reveal 在 mount 时一次性触发，不适合页面下方的图。
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const shots = Array.from(section.querySelectorAll<HTMLElement>("[data-shot]"));
    if (!shots.length) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || typeof IntersectionObserver === "undefined") {
      shots.forEach((shot) => shot.classList.add("is-in"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
    );

    shots.forEach((shot) => observer.observe(shot));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="product"
      ref={sectionRef}
      className="relative scroll-mt-24 px-6 pb-24 pt-24 md:pb-32 md:pt-32"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p className="font-mono text-[11px] tracking-[0.3em] text-neutral-500">
              产品 / PRODUCT
            </p>
            <h2 className="mt-6 text-3xl font-semibold leading-[1.15] tracking-tight text-neutral-900 md:text-5xl">
              一个对话框，
              <br className="hidden md:block" />
              装得下所有上下文
            </h2>
          </div>

          <div className="md:col-span-4 md:col-start-9">
            <p className="text-sm leading-7 text-neutral-500">
              会话按场景自动切换。插件把文本、界面与数据接入同一条消息流；记录、记忆与配置都留在你的电脑里。
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
              <a
                href={DEMO_URL}
                className="inline-flex h-10 items-center justify-center rounded-md bg-neutral-900 px-4 text-xs font-medium tracking-wide text-white transition-colors hover:bg-neutral-700"
              >
                下载桌面版
                <span className="ml-2 text-white/55" aria-hidden>
                  ↗
                </span>
              </a>
              <a
                href={REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-neutral-500 underline-offset-4 transition-colors hover:text-neutral-900 hover:underline"
              >
                查看源码
              </a>
            </div>
          </div>
        </div>

        <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-5 border-y border-neutral-200 py-6 md:grid-cols-4">
          {proactiveSpecs.map((spec) => (
            <div key={spec.label}>
              <dt className="font-mono text-[10px] tracking-[0.24em] text-neutral-400">
                {spec.label}
              </dt>
              <dd className="mt-1.5 text-[13px] text-neutral-700">{spec.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-14 md:mt-20">
          <ScreenshotPlate plate={proactiveShowcase.overview} />
        </div>

        <div className="mt-16 md:mt-24">
          {proactiveShowcase.features.map((feature) => (
            <FeatureRow key={feature.title} feature={feature} />
          ))}
        </div>

        <div className="mt-16 border-t border-neutral-200 pt-16 md:mt-24 md:pt-20">
          <div className="flex items-baseline justify-between gap-4">
            <p className="font-mono text-[11px] tracking-[0.3em] text-neutral-500">
              细节 / DETAILS
            </p>
            <p className="font-mono text-[10px] tracking-[0.18em] text-neutral-400">
              FIG. 04 — 05
            </p>
          </div>

          <div className="mt-10 grid gap-10 md:grid-cols-12 md:items-start md:gap-16">
            <div className="md:col-span-7">
              <ScreenshotPlate plate={proactiveShowcase.details[0]} />
            </div>
            <div className="md:col-span-4 md:col-start-9">
              <ScreenshotPlate plate={proactiveShowcase.details[1]} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
