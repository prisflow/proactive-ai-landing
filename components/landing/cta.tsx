const DEMO_URL = process.env.NEXT_PUBLIC_DEMO_URL || "#";

export function Cta() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto max-w-6xl px-4 text-center">
        <div className="rounded-2xl border bg-card p-10 md:p-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            让对话按场景组织
          </h2>
          <p className="mt-4 text-white/55 max-w-md mx-auto">
            下载 Proactive AI，体验上下文切换、工具与 Flow 编排的组合——长对话也能保持清晰上下文、节约 token。
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <a
              href={DEMO_URL}
              className="inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-white text-black text-sm font-medium whitespace-nowrap transition-all h-9 gap-1.5 px-2.5 hover:bg-white/80"
            >
              下载体验
            </a>
            <a
              href="https://github.com/prisflow/proactive-ai-desktop"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center justify-center rounded-lg border border-white/10 bg-background text-sm font-medium whitespace-nowrap transition-all h-9 gap-1.5 px-2.5 hover:bg-muted hover:text-white"
            >
              开源仓库
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
