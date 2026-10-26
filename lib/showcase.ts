/**
 * 首页「产品档案」图版数据。
 *
 * 设计约定：
 * - 图版不是营销卡片，而是带编号、题注的“档案图版”；
 * - 主图版 16:10，细节图按原图比例呈现，宽幅 / 近方交替形成节奏；
 * - 不叠加批注点：截图本身 + 题注已足够，避免为了对齐而过度设计。
 */

export type ShowcasePlate = {
  src: string;
  srcSet: string;
  fullSrc: string;
  sizes: string;
  width: number;
  height: number;
  alt: string;
  fig: string;
  title: string;
  caption: string;
  variant?: "plate" | "detail" | "portrait";
  eager?: boolean;
};

export type ShowcaseFeature = {
  eyebrow: string;
  title: string;
  body: string;
  bullets: string[];
  plate: ShowcasePlate;
  reverse?: boolean;
};

export const proactiveSpecs = [
  { label: "平台", value: "Windows / macOS" },
  { label: "存储", value: "本地 SQLite" },
  { label: "扩展", value: "zip 插件 / UI 消息" },
  { label: "模型", value: "OpenAI 兼容 API" },
];

export const proactiveShowcase: {
  overview: ShowcasePlate;
  features: ShowcaseFeature[];
  details: ShowcasePlate[];
} = {
  overview: {
    src: "/screenshots/01-overview-1200.webp",
    srcSet:
      "/screenshots/01-overview-1200.webp 1200w, /screenshots/01-overview-2400.webp 2400w",
    fullSrc: "/screenshots/01-overview-2400.webp",
    sizes: "(min-width: 1280px) 1152px, calc(100vw - 48px)",
    width: 2400,
    height: 1500,
    alt: "Proactive AI 桌面端主界面：进入 cultivation 上下文后的修仙对话，包含世界卡、角色状态、剧情文本和分支选项",
    fig: "FIG. 01",
    title: "主界面 · 修仙插件",
    caption:
      "进入 cultivation 上下文后，世界卡、角色卡、剧情文本与分支选项共享同一条对话流；状态由插件声明，宿主负责渲染与回放。",
    variant: "plate",
    eager: true,
  },
  features: [
    {
      eyebrow: "成本 / TOKEN",
      title: "每一次缓存命中，都看得见",
      body: "稳定前缀与分层记忆让缓存命中率长期保持高位；日志把输入、输出、缓存和命中率拆开呈现，长对话的成本不再是黑箱。",
      bullets: ["按上下文配置压缩预算", "缓存命中率实时可见", "长对话成本可控"],
      reverse: true,
      plate: {
        src: "/screenshots/02-token-log-800.webp",
        srcSet:
          "/screenshots/02-token-log-800.webp 800w, /screenshots/02-token-log-1600.webp 1600w",
        fullSrc: "/screenshots/02-token-log-1600.webp",
        sizes: "(min-width: 768px) 640px, calc(100vw - 48px)",
        width: 1600,
        height: 1380,
        alt: "Proactive AI 系统日志：Token 使用统计、缓存命中率与按小时、按周趋势图",
        fig: "FIG. 02",
        title: "系统日志 · Token",
        caption:
          "输入命中缓存 7,742,208 tokens，整体命中率 89.5%。缓存命中的部分不再重复计费，长对话成本因此可控。",
        variant: "detail",
      },
    },
    {
      eyebrow: "插件 / PLUGIN",
      title: "你说要什么，它来写插件",
      body: "整个过程都在对话里完成：AI 先做需求问询，再确认设定稿，分层实现并多轮试玩验证。底层仍是上下文、工具与 LLM Flow 三件套。",
      bullets: ["需求问询 → 设定稿", "分层实现，自动校验", "多轮试玩验证"],
      plate: {
        src: "/screenshots/03-plugin-creation-800.webp",
        srcSet:
          "/screenshots/03-plugin-creation-800.webp 800w, /screenshots/03-plugin-creation-1600.webp 1600w",
        fullSrc: "/screenshots/03-plugin-creation-1600.webp",
        sizes: "(min-width: 768px) 640px, calc(100vw - 48px)",
        width: 1600,
        height: 814,
        alt: "Proactive AI 对话造插件：用户描述插件需求，AI 询问战斗与恋爱比重、角色来源与开放尺度",
        fig: "FIG. 03",
        title: "对话 · 造插件",
        caption:
          "描述你想要的插件；AI 先确认战斗与恋爱的比重、角色来源与开放尺度，再进入设定稿、实现与试玩验证。",
        variant: "detail",
      },
    },
  ],
  details: [
    {
      src: "/screenshots/04-character-sheet-800.webp",
      srcSet:
        "/screenshots/04-character-sheet-800.webp 800w, /screenshots/04-character-sheet-1534.webp 1534w",
      fullSrc: "/screenshots/04-character-sheet-1534.webp",
      sizes: "(min-width: 768px) 660px, calc(100vw - 48px)",
      width: 1534,
      height: 1502,
      alt: "Proactive AI 角色卡细节：修为、体力、灵石、寿元、天资和储物袋",
      fig: "FIG. 04",
      title: "角色卡 · 状态",
      caption:
        "修为、体力、灵石、寿元、天资和储物袋都在同一张卡里。状态变了，卡片跟着重渲染，不用另开面板。",
      variant: "detail",
    },
    {
      src: "/screenshots/05-settings-600.webp",
      srcSet:
        "/screenshots/05-settings-600.webp 600w, /screenshots/05-settings-878.webp 878w",
      fullSrc: "/screenshots/05-settings-878.webp",
      sizes: "(min-width: 768px) 380px, 80vw",
      width: 878,
      height: 1385,
      alt: "Proactive AI 设置面板：导入插件、外观与字体、LLM API Key 和模型配置",
      fig: "FIG. 05",
      title: "设置 · 本地配置",
      caption:
        "导入插件、切换外观、填模型 Key 都在这里。Key 和插件配置只写本机。",
      variant: "portrait",
    },
  ],
};
