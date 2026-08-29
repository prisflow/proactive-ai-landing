export default function PrivacyPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight mb-6">隐私政策</h1>
      <div className="prose text-sm text-muted-foreground space-y-4">
        <p>最后更新：2026 年 8 月</p>
        <h2 className="text-foreground font-semibold text-base mt-6">1. 信息收集</h2>
        <p>
          我们收集您在联系我们时主动提供的信息，如姓名、邮箱地址、单位名称与留言内容。此外，为改进产品，我们可能会收集匿名的使用数据。
        </p>
        <h2 className="text-foreground font-semibold text-base mt-6">2. 本地数据</h2>
        <p>
          Proactive AI 是一款本地优先的桌面应用。您的聊天记录、记忆、配置与插件数据均存储在您本机（SQLite 数据库），不会上传至我们的服务器。数据仅在您本机与您配置的模型服务之间直接交换。
        </p>
        <h2 className="text-foreground font-semibold text-base mt-6">3. 信息使用</h2>
        <p>
          我们使用收集的信息来提供、维护和改进服务，以及与您沟通。我们不会出售或出租您的个人信息。
        </p>
        <h2 className="text-foreground font-semibold text-base mt-6">4. 信息保护</h2>
        <p>
          我们采取合理的安全措施保护您的个人信息，但无法保证绝对安全。您对本地数据的安全负有责任，建议妥善保管您的设备与模型服务密钥。
        </p>
        <h2 className="text-foreground font-semibold text-base mt-6">5. 联系我们</h2>
        <p>如对本隐私政策有任何疑问，请通过 /contact 页面与我们联系。</p>
      </div>
    </div>
  );
}
