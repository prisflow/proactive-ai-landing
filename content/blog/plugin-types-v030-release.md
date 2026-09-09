---
title: "plugin-types 0.3.0 发布：ToolDefinition 正式收录 autoYield"
date: "2026-09-09"
excerpt: "面向插件开发者的类型包更新：@prisflow/proactiveai-plugin-types 0.3.0 在 ToolDefinition 中正式收录 autoYield 可选字段——剧情类工具可声明由引擎直接收轮。需宿主 v0.6.3 及以上。"
---

## plugin-types 0.3.0：autoYield 正式收录

`@prisflow/proactiveai-plugin-types` 是 ProactiveAI 插件开发的官方类型包。0.3.0 将宿主 v0.6.3 引入的工具能力同步进类型声明：

```ts
export interface NonSilentToolDef {
  // ...原有字段
  /** 收轮引擎化：执行 + transformPrompt 完成后，引擎直接收轮（等同 host_yield），
   *  不再以 instruction 回喂 LLM。剧情类工具专用。需宿主 ≥ 0.6.3。 */
  autoYield?: boolean
}
```

`SilentToolDef` 与 `NonSilentToolDef` 均已收录。

## 使用方式

适合"一次工具执行就是一段完整剧情"的剧情类工具：

```ts
api.registerTool({
  name: 'battle',
  // ...
  autoYield: true,  // 执行 + 渲染完成后引擎直接收轮
  transformPrompt: (result) => ({ /* ... */ }),
})
```

开启后：工具执行完毕 → 界面推送 → **引擎直接收轮**，不再生成"下一步 instruction"回喂模型。收轮时序由引擎保证，消除模型忘记收轮/过度续写的偶发问题。

## 升级

```bash
pnpm up @prisflow/proactiveai-plugin-types@^0.3.0
```

运行时要求：宿主 v0.6.3 及以上（[桌面端 v0.6.3 发布说明](/blog/proactive-ai-v063-release)）。
