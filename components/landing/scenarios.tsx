const scenarios = [
  {
    title: "多场景对话",
    description: "同一个对话里切换不同上下文：写代码、查资料、处理表格各自有独立提示词与工具集，宿主自动进入退出，互不干扰。",
    badge: "上下文切换",
  },
  {
    title: "沉浸文字游戏",
    description: "插件定义游戏上下文：AI 旁白生成剧情、静态节点结算状态、UI 消息渲染状态栏与选项卡片，文本消息与 UI 消息同屏。",
    badge: "插件生态",
  },
  {
    title: "专业工具流",
    description: "为特定任务注册工具与 Flow：数据整理、内容生成、规则校验，静态记账节点保证确定性，LLM 只负责生成与判断。",
    badge: "效率工具",
  },
];

export function Scenarios() {
  return (
    <section id="scenarios" className="py-16 md:py-24 scroll-mt-20">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">适用场景</h2>
          <p className="mt-3 text-slate-600 max-w-lg mx-auto">
            上下文切换让 Proactive AI 在一个对话里承载多个专业场景。
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {scenarios.map((item) => (
            <div key={item.title} className="rounded-xl border bg-card p-6">
              <span className="inline-block rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary mb-3">
                {item.badge}
              </span>
              <h3 className="text-base font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
