import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const features = [
  {
    title: "上下文自动切换",
    description: "对话按「上下文 → 工具 → 静态逻辑 / LLM Flow」组织：插件为每个场景注册专属上下文，宿主在回合内自动进入与退出，无需用户手动切换。",
  },
  {
    title: "两种消息形态",
    description: "文本消息：流式输出的对话文本，走 Markdown / 代码高亮 / Mermaid 渲染。UI 消息：由工具产生的界面组件（按钮、状态面板、选项卡片），直渲染进对话流。",
  },
  {
    title: "工具与静态逻辑",
    description: "上下文决定可用工具集；工具执行走 schema 校验，内置静态记账节点（纯函数）处理规则与状态，LLM 只负责生成，行为可预期。",
  },
  {
    title: "LLM Flow 编排",
    description: "复杂动作拆为 Flow 图：LLM 生成节点 + 静态节点 + 渲染终止节点，宿主托管执行、schema 校验失败自动重试与降级。",
  },
  {
    title: "压缩层按上下文配置",
    description: "压缩层为每个上下文暴露配置 API：预算、摘要槽位、保留 token、再压缩——开发者按场景调优，而非一套逻辑打天下。",
  },
  {
    title: "分层记忆 × 系统提示词",
    description: "记忆按会话 + 上下文分层，对应上下文的系统提示词稳定拼接；缓存命中率在长期使用中可达 90%–95% 甚至更高，大幅节约 token 成本。",
  },
  {
    title: "插件生态",
    description: "插件通过统一注册 API 为上下文注入工具与提示词（当前以手动方式试点安装，维护与分发方案仍在设计中）。",
  },
  {
    title: "手机远程 · 网页版",
    description: "自建中继服务器连接 PC 宿主与移动端：宿主 WebSocket 出站注册（无需公网 IP），手机扫码进入网页版。消息 HTTP POST 上行、SSE 实时下行，中继纯转发零落盘。",
  },
  {
    title: "隐私优先",
    description: "所有数据本地化：聊天、记忆、插件状态与配置全部落在本地 SQLite，数据不经过我们的服务器，只在你与模型服务之间直接交换。",
  },
];

export function Features() {
  return (
    <section id="features" className="py-16 md:py-24 bg-muted/50">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">核心能力</h2>
          <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
            上下文驱动的对话结构，把长会话变成可管理的场景。
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Card key={feature.title} className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">{feature.title}</CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
