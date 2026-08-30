# Proactive AI Landing

Proactive AI 桌面版官网：[proactiveai.prisflow.com](https://proactiveai.prisflow.com)

Next.js 静态站点（`output: export`），部署于 EdgeOne Makers。

## 开发

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build   # 产物在 out/
```

## 环境变量

- `NEXT_PUBLIC_DEMO_URL`：下载链接（COS/CDN 直链），见 `.env.example`
- 联系表单固定 POST 到 `/api/contact`（EdgeOne 自动挂载 `edge-functions/api/contact.js`）
