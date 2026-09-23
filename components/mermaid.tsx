"use client";

import { useEffect } from "react";
import mermaid from "mermaid";

mermaid.initialize({ startOnLoad: false, theme: "neutral" });

/**
 * 渲染正文中 mermaid 代码块为图表。
 * - slug 变化（切换文章）即重扫
 * - dataset 标记防重入（StrictMode 双跑只渲染一次）
 * - crypto.randomUUID 唯一 id（杜绝 Date.now 同毫秒撞车）
 * - 全链路 console 诊断日志（前缀 [mermaid] 便于过滤）
 */
export function Mermaid({ slug }: { slug?: string }) {
  useEffect(() => {
    console.log("[mermaid] effect 触发, slug =", slug);
    const blocks = Array.from(
      document.querySelectorAll<HTMLElement>(".language-mermaid"),
    ).filter((b) => !b.dataset.mermaidDone);
    console.log("[mermaid] 待渲染块 =", blocks.length);
    if (!blocks.length) return;

    blocks.forEach(async (block, i) => {
      block.dataset.mermaidDone = "1";
      const pre = block.closest("pre");
      console.log(
        `[mermaid] 块#${i}: pre =`, !!pre,
        "| 源码前 40 字 =", JSON.stringify((block.textContent || "").slice(0, 40)),
      );
      if (!pre) return;

      const id = `mermaid-${crypto.randomUUID()}`;
      const wrapper = document.createElement("div");
      wrapper.className = "mermaid-wrapper my-6 flex justify-center";

      try {
        console.log(`[mermaid] 块#${i}: 开始渲染, id = ${id}`);
        const t0 = performance.now();
        const { svg } = await mermaid.render(id, block.textContent || "");
        console.log(`[mermaid] 块#${i}: 渲染成功, 耗时 ${Math.round(performance.now() - t0)}ms, svg 长度 = ${svg.length}`);
        wrapper.innerHTML = svg;
      } catch (e) {
        console.error(`[mermaid] 块#${i}: 渲染失败`, e);
        wrapper.textContent = "[Mermaid 渲染失败]";
      }

      pre.replaceWith(wrapper);
      console.log(`[mermaid] 块#${i}: 已替换 pre`);
    });
  }, [slug]);

  return null;
}
