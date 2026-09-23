export default function TermsPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight mb-6">服务条款</h1>
      <div className="prose text-sm text-muted-foreground space-y-4">
        <p>最后更新：2026 年 8 月</p>
        <h2 className="text-foreground font-semibold text-base mt-6">1. 服务说明</h2>
        <p>
          Proactive AI 是一款会自己切换上下文的 AI 聊天助手应用，提供上下文驱动的对话组织、
          工具与 Flow 编排、压缩与分层记忆能力。使用本应用即表示您同意本条款。
        </p>
        <h2 className="text-foreground font-semibold text-base mt-6">2. 用户责任</h2>
        <p>
          您不得利用本应用从事任何违法活动；您对自己配置的模型服务、API 密钥的保管与使用负责；使用第三方插件前请自行评估其代码与行为风险。
        </p>
        <h2 className="text-foreground font-semibold text-base mt-6">3. 第三方内容</h2>
        <p>
          本应用支持安装第三方插件，插件提供的工具、提示词、UI 组件及其生成内容由插件作者独立负责。我们不对第三方插件的安全性、完整性或适用性作任何保证。
        </p>
        <h2 className="text-foreground font-semibold text-base mt-6">4. 免责声明</h2>
        <p>
          本应用按&quot;现状&quot;提供，不提供任何明示或暗示的保证。在法律允许的范围内，我们不对因使用本应用或模型服务输出而产生的任何损失承担责任。
        </p>
        <h2 className="text-foreground font-semibold text-base mt-6">5. 联系我们</h2>
        <p>如对本条款有任何疑问，请通过 /contact 页面与我们联系。</p>
      </div>
    </div>
  );
}
