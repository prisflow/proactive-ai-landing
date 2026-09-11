"use client";

import { useState } from "react";

const screenshots = [
  {
    label: "对话界面",
    description: "文本消息流式渲染、快捷按钮与选项卡片等 UI 消息直嵌对话流，游戏与工作场景同屏",
    image: "/example1.png",
  },
  {
    label: "Token 监控",
    description: "系统日志实时追踪 token 消耗：输入命中 / 未命中缓存分区、请求趋势与缓存命中率",
    image: "/example2.png",
  },
  {
    label: "设置面板",
    description: "语言切换、外观主题、字体大小与模型服务配置；公网中继支持链接与二维码扫码接入，手机随时远程使用。全部数据本地存储",
    image: "/example3.png",
  },
];

export function Screenshots() {
  const [zoom, setZoom] = useState<{ src: string; label: string } | null>(null);

  return (
    <section id="screenshots" className="py-16 md:py-24 scroll-mt-20">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">产品预览</h2>
          <p className="mt-3 text-slate-600 max-w-lg mx-auto">
            简洁直观的界面设计，轻松上手。
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {screenshots.map((item) => (
            <div
              key={item.label}
              className="rounded-xl border bg-card overflow-hidden cursor-pointer"
              onClick={() => setZoom({ src: item.image, label: item.label })}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image}
                alt={item.label}
                className="w-full aspect-[16/10] object-cover bg-gray-50"
              />
              <div className="p-4">
                <h3 className="text-sm font-semibold">{item.label}</h3>
                <p className="mt-1 text-xs text-slate-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {zoom && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setZoom(null)}
        >
          <button
            className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-black/40 text-white/80 hover:text-white hover:bg-black/60 text-xl transition-colors"
            onClick={() => setZoom(null)}
          >
            ✕
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={zoom.src}
            alt={zoom.label}
            className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          <p className="absolute bottom-6 text-white text-sm drop-shadow">{zoom.label}</p>
        </div>
      )}
    </section>
  );
}
