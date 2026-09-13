"use client";

/**
 * 核心能力：六张玻璃卡，滚动时依次入场（stagger）。
 */
import {
  MessagesSquare, Sparkles, LayoutDashboard, MonitorSmartphone, Network, HardDrive,
} from "lucide-react";
import { Reveal } from "./reveal";

const FEATURES = [
  {
    icon: MessagesSquare,
    title: "对话即入口",
    desc: "一切能力从对话框触达——自然语言驱动工具调用、剧情推进、数据查询，无需学习任何界面。",
    tint: "from-blue-500/10 to-transparent",
    ring: "group-hover:ring-blue-500/40",
    ic: "text-blue-600",
  },
  {
    icon: Sparkles,
    title: "对话造插件",
    desc: "把需求讲清楚就能长出完整插件：AI 负责需求问询、设定稿确认、分层实现与多轮试玩验证。底层仍是上下文＋工具＋Flow 三件套。",
    tint: "from-indigo-500/10 to-transparent",
    ring: "group-hover:ring-indigo-500/40",
    ic: "text-indigo-600",
  },
  {
    icon: LayoutDashboard,
    title: "UI 推送组件",
    desc: "16 个声明式组件直接推进对话——状态卡、进度条、彩色徽章、可折叠面板，双端渲染同源。",
    tint: "from-emerald-500/10 to-transparent",
    ring: "group-hover:ring-emerald-500/40",
    ic: "text-emerald-400",
  },
  {
    icon: MonitorSmartphone,
    title: "多端同屏",
    desc: "PC 端与手机浏览器同一体验：中继消息管道实时同步，UI 组件在两端像素级一致。",
    tint: "from-sky-500/10 to-transparent",
    ring: "group-hover:ring-sky-500/40",
    ic: "text-sky-400",
  },
  {
    icon: Network,
    title: "中继架构",
    desc: "PC 出站连接、零端口暴露；配对码双因子校验、状态无状态转发——安全与便利兼得。",
    tint: "from-amber-500/10 to-transparent",
    ring: "group-hover:ring-amber-500/40",
    ic: "text-amber-400",
  },
  {
    icon: HardDrive,
    title: "本地优先",
    desc: "会话、插件数据、世界观全部落在本地数据库；断网可读，隐私不出机器。",
    tint: "from-slate-500/10 to-transparent",
    ring: "group-hover:ring-slate-400/40",
    ic: "text-slate-600",
  },
];

export function Features() {
  return (
    <section id="features" className="relative scroll-mt-20 py-20 md:py-28">
      <div className="container mx-auto max-w-6xl px-4">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <div className="text-xs font-medium uppercase tracking-[0.2em] text-blue-600">Core</div>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">为插件生态打底的核心能力</h2>
            <p className="mt-4 text-slate-600">
              宿主把脏活全包了——插件开发者面对的，只剩纯粹的创造。
            </p>
          </div>
        </Reveal>

        <Reveal className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
          {FEATURES.map((f) => (
            <div
              key={f.title}
              data-reveal-item
              className={`group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm ring-1 ring-transparent transition-all duration-300 hover:bg-blue-50/40 hover:ring-2 ${f.ring}`}
            >
              <div className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-gradient-to-b ${f.tint}`}>
                <f.icon className={`h-5 w-5 ${f.ic}`} />
              </div>
              <h3 className="text-base font-semibold text-slate-900">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{f.desc}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
