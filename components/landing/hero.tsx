import Link from "next/link";
import Image from "next/image";

const DEMO_URL = process.env.NEXT_PUBLIC_DEMO_URL || "#";

export function Hero() {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto max-w-6xl px-4 text-center">
        <div className="mb-8">
          <Image src="/prisflow-logo.svg" alt="Prisflow" className="h-20 md:h-32 mx-auto" width={280} height={212} />
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight max-w-3xl mx-auto leading-tight">
          会自己切换上下文的
          <br />
          AI 聊天助手
        </h1>
        <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto">
          Proactive AI 的对话按「上下文 → 工具 → 静态逻辑 / LLM Flow」组织：插件为每个场景注入专属上下文与工具，
          宿主自动托管切换、压缩与渲染。消息以 UI 消息与文本消息两种形式呈现。
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <a
            href={DEMO_URL}
            className="inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-primary text-primary-foreground text-sm font-medium whitespace-nowrap transition-all h-9 gap-1.5 px-2.5 hover:bg-primary/80"
          >
            下载体验
          </a>
          <Link
            href="/#features"
            className="inline-flex shrink-0 items-center justify-center rounded-lg border border-border bg-background text-sm font-medium whitespace-nowrap transition-all h-9 gap-1.5 px-2.5 hover:bg-muted hover:text-foreground"
          >
            了解更多
          </Link>
        </div>
      </div>
    </section>
  );
}
