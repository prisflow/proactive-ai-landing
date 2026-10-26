"use client";

/* eslint-disable @next/next/no-img-element */

import { useState } from "react";
import type { ShowcasePlate } from "@/lib/showcase";
import { Lightbox } from "./lightbox";

const framePadding = {
  plate: "p-2 md:p-3",
  detail: "p-1.5 md:p-2",
  portrait: "p-2 md:p-3",
} as const;

const frameShadow = {
  plate: "shadow-[0_32px_80px_-56px_rgba(0,0,0,0.5)]",
  detail: "shadow-[0_24px_60px_-48px_rgba(0,0,0,0.4)]",
  portrait: "shadow-[0_28px_70px_-50px_rgba(0,0,0,0.45)]",
} as const;

export function ScreenshotPlate({ plate }: { plate: ShowcasePlate }) {
  const [open, setOpen] = useState(false);
  const variant = plate.variant ?? "detail";
  const isPortrait = variant === "portrait";

  return (
    <figure className={isPortrait ? "mx-auto w-full max-w-[420px]" : "w-full"}>
      <button
        type="button"
        data-shot
        onClick={() => setOpen(true)}
        aria-label={`放大查看：${plate.title}`}
        className="group/frame block w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/30"
      >
        <span
          className={`block rounded-lg border border-neutral-200 bg-neutral-50 transition-colors duration-300 group-hover/frame:border-neutral-300 ${framePadding[variant]} ${frameShadow[variant]}`}
        >
          <span className="relative block overflow-hidden rounded-[5px] border border-neutral-200/80 bg-white">
            <img
              src={plate.src}
              srcSet={plate.srcSet}
              sizes={plate.sizes}
              width={plate.width}
              height={plate.height}
              alt={plate.alt}
              loading={plate.eager ? "eager" : "lazy"}
              decoding="async"
              fetchPriority={plate.eager ? "high" : "auto"}
              className="block h-auto w-full transition-transform duration-700 ease-out group-hover/frame:scale-[1.012]"
            />
          </span>
        </span>
      </button>

      <figcaption className="mt-4 border-t border-neutral-200 pt-3">
        <div className="flex items-baseline justify-between gap-4">
          <div className="flex min-w-0 items-baseline gap-4">
            <span className="shrink-0 font-mono text-[10px] tracking-[0.18em] text-neutral-400">
              {plate.fig}
            </span>
            <span className="truncate text-[13px] font-medium text-neutral-700">
              {plate.title}
            </span>
          </div>
          <span className="hidden shrink-0 font-mono text-[10px] tracking-[0.12em] text-neutral-400 transition-colors group-hover/frame:text-neutral-700 sm:block">
            点击查看原图 ↗
          </span>
        </div>

        <p className="mt-2 max-w-2xl text-[13px] leading-6 text-neutral-500">
          {plate.caption}
        </p>
      </figcaption>

      <Lightbox open={open} onClose={() => setOpen(false)} plate={plate} />
    </figure>
  );
}
