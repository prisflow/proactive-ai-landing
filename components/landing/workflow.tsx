const steps = [
  {
    step: "1",
    title: "安装应用",
    description: "下载桌面端并配置模型服务（OpenAI 兼容接口）。所有数据本地存储，即装即用。",
  },
  {
    step: "2",
    title: "注册上下文与工具",
    description: "插件为场景注册专属上下文（提示词 + 工具集）与 Flow 图，宿主自动发现并纳入对话循环。",
  },
  {
    step: "3",
    title: "上下文自动切换",
    description: "对话中宿主按需进入/退出子上下文，各上下文独立历史，互不污染；工具结果经统一转换回填。",
  },
  {
    step: "4",
    title: "长期使用更省",
    description: "压缩层按上下文配置预算与摘要，记忆注入稳定前缀，缓存命中率可达 90%–95% 以上，token 成本随对话越用越低。",
  },
];

export function Workflow() {
  return (
    <section id="workflow" className="py-16 md:py-24">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">工作流程</h2>
          <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
            从安装到托管运行，四步打造场景化的 AI 对话。
          </p>
        </div>
        <div className="relative">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />
          <div className="space-y-8 md:space-y-12">
            {steps.map((item, i) => (
              <div
                key={item.step}
                className={`relative flex flex-col md:flex-row items-start gap-6 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div className={`flex-1 ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                </div>
                <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border bg-background text-sm font-bold">
                  {item.step}
                </div>
                <div className="flex-1 hidden md:block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
