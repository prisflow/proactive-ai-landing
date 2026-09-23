"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ContactPage() {
  const [state, setState] = useState<"idle" | "loading" | "ok" | "error">("idle");

  // 表单 POST 到同域 Edge Function 路由（EdgeOne 部署时自动挂载 edge-functions/api/contact.js）
  const API_URL = "/api/contact";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setState("loading");

    try {
      const res = await fetch(API_URL, { method: "POST", body: data });
      setState(res.ok ? "ok" : "error");
    } catch {
      setState("error");
    }
  }

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold tracking-tight mb-2">联系我们</h1>
        <p className="text-muted-foreground">
          想要了解更多？填写表单，我们会尽快与您联系。
        </p>
      </div>

      <Card className="max-w-lg mx-auto border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">联系我们</CardTitle>
          <CardDescription>
            提交后我们将通过邮件与您沟通，支持插件开发合作、产品反馈与咨询。
          </CardDescription>
        </CardHeader>
        <CardContent>
          {state === "ok" ? (
            <div className="text-center py-8">
              <p className="font-medium">感谢您的关注！</p>
              <p className="text-sm text-muted-foreground mt-1">
                我们会尽快与您联系。
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="text-sm font-medium block mb-1.5">
                  姓名
                </label>
                <Input id="name" name="name" required placeholder="您的姓名" />
              </div>
              <div>
                <label htmlFor="email" className="text-sm font-medium block mb-1.5">
                  邮箱
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label htmlFor="institution" className="text-sm font-medium block mb-1.5">
                  单位 / 组织
                </label>
                <Input id="institution" name="institution" placeholder="XX 团队" />
              </div>
              <div>
                <label htmlFor="message" className="text-sm font-medium block mb-1.5">
                  留言
                </label>
                <Textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="说说您的需求..."
                />
              </div>
              {state === "error" && (
                <p className="text-sm text-red-500">提交失败，请稍后重试或直接发邮件联系我们。</p>
              )}
              <Button type="submit" className="w-full" disabled={state === "loading"}>
                {state === "loading" ? "提交中..." : "提交"}
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                提交后将通过邮件通知我们。
              </p>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
