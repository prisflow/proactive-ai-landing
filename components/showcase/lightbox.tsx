"use client";

import { useEffect, useRef } from "react";
import type { ShowcasePlate } from "@/lib/showcase";

/**
 * 原生 <dialog> 灯箱：无依赖、焦点由浏览器管理。
 * 点击遮罩或按 Esc 关闭；关闭后焦点回到触发图版。
 */
export function Lightbox({
  open,
  onClose,
  plate,
}: {
  open: boolean;
  onClose: () => void;
  plate: ShowcasePlate;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open) {
      if (!dialog.open) dialog.showModal();
      document.documentElement.classList.add("lightbox-open");
    } else {
      if (dialog.open) dialog.close();
      document.documentElement.classList.remove("lightbox-open");
    }

    return () => {
      document.documentElement.classList.remove("lightbox-open");
    };
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleBackdrop = (event: MouseEvent) => {
      if (event.target === dialog) onClose();
    };
    const handleCancel = (event: Event) => {
      event.preventDefault();
      onClose();
    };

    dialog.addEventListener("click", handleBackdrop);
    dialog.addEventListener("cancel", handleCancel);
    return () => {
      dialog.removeEventListener("click", handleBackdrop);
      dialog.removeEventListener("cancel", handleCancel);
    };
  }, [onClose]);

  return (
    <dialog ref={dialogRef} className="lightbox" aria-label={`${plate.title} 原图`}>
      <div className="flex max-h-[92vh] w-full flex-col">
        <div className="flex items-center justify-between gap-6 pb-3">
          <p className="font-mono text-[10px] tracking-[0.2em] text-white/50">
            {plate.fig} / {plate.title}
          </p>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-md border border-white/15 px-3 py-1.5 font-mono text-[10px] tracking-[0.18em] text-white/70 transition-colors hover:border-white/35 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          >
            关闭 ✕
          </button>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {open ? (
          <img
            src={plate.fullSrc}
            alt={plate.alt}
            className="min-h-0 max-h-[80vh] w-auto max-w-full self-center rounded-md object-contain"
          />
        ) : null}
        <p className="mx-auto max-w-3xl pt-3 text-center text-[11px] leading-5 text-white/45">
          {plate.caption}
        </p>
      </div>
    </dialog>
  );
}
