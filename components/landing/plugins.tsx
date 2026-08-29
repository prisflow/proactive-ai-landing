import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const plugins = [
  {
    title: "内置：修仙世界",
    description:
      "安装即带的官方示例插件：AI 旁白叙事、静态规则节点结算境界/修为、UI 消息渲染状态栏与选项卡片，开箱即可体验文字修仙。",
    badge: "官方内置",
  },
  {
    title: "Zip 包导入",
    description:
      "插件以 zip 包分发（plugin.json 元数据 + 单文件入口）。在应用「设置 → 插件」中点击导入并选择 zip，安装后自动加载。",
    badge: "安装方式",
  },
  {
    title: "元数据规范",
    description:
      "plugin.json 定义 id/name/version/entry 等字段（参考主流扩展清单），版本为 semver，入口支持 CJS 单文件。",
    badge: "开发规范",
  },
];

export function Plugins() {
  return (
    <section id="plugins" className="py-16 md:py-24 bg-muted/50">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">插件生态</h2>
          <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
            从内置示例到 zip 分发，插件围绕「上下文 + 工具 + Flow」组织能力。
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {plugins.map((item) => (
            <Card key={item.title} className="border-0 shadow-sm">
              <CardHeader>
                <span className="inline-block w-fit rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary mb-1">
                  {item.badge}
                </span>
                <CardTitle className="text-base">{item.title}</CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  {item.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-muted-foreground">
          想开发自己的插件？查看{" "}
          <a
            href="https://github.com/prisflow/proactive-ai-cultivation"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-foreground transition-colors"
          >
            修仙插件源码
          </a>{" "}
          了解上下文、工具与 Flow 的注册范式，以及 plugin.json 的打包规范。
        </p>
      </div>
    </section>
  );
}
