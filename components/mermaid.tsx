"use client";

import { useEffect } from "react";
import mermaid from "mermaid";

mermaid.initialize({ startOnLoad: false, theme: "neutral" });

/**
 * 渲染正文中 mermaid 代码块为图表。
 * - slug 变化（切换文章）即重扫
 * - dataset 标记防重入（StrictMode 双跑只渲染一次）
 * - crypto.randomUUID 唯一 id（杜绝 Date.now 同毫秒撞车）
 */
export function Mermaid({ slug }: { slug?: string }) {
  useEffect(() => {
    const blocks = Array.from(
      document.querySelectorAll<HTMLElement>(".language-mermaid"),
    ).filter((b) => !b.dataset.mermaidDone);
    if (!blocks.length) return;

    blocks.forEach(async (block) => {
      block.dataset.mermaidDone = "1";
      const pre = block.closest("pre");
      if (!pre) return;

      const id = `mermaid-${crypto.randomUUID()}`;
      const wrapper = document.createElement("div");
      wrapper.className = "mermaid-wrapper my-6 flex justify-center";

      try {
        const { svg } = await mermaid.render(id, block.textContent || "");
        wrapper.innerHTML = svg;
      } catch {
        wrapper.textContent = "[Mermaid 渲染失败]";
      }

      pre.replaceWith(wrapper);
    });
  }, [slug]);

  return null;
}
