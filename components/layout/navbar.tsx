"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const RELEASE_URL = "https://github.com/prisflow/proactive-ai-desktop/releases";

const navLinks = [
  { href: "/", label: "首页" },
  { href: "/#blog", label: "博客" },
  { href: "/contact", label: "联系我们" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Image src="/prisflow-favicon.svg" alt="" className="h-6 w-6" width={24} height={24} />
          Proactive AI
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <a
          href={RELEASE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-neutral-900 text-white text-sm font-medium whitespace-nowrap transition-all h-9 gap-1.5 px-2.5 hover:bg-neutral-700"
        >
          下载体验
        </a>

        {/* 小屏菜单 */}
        <button
          className="md:hidden p-2"
          onClick={() => setOpen(!open)}
          aria-label="菜单"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {open ? (
              <path d="M5 5l10 10M15 5L5 15" />
            ) : (
              <path d="M3 5h14M3 10h14M3 15h14" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-sm text-muted-foreground hover:text-foreground"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={RELEASE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-neutral-900 text-white text-sm font-medium whitespace-nowrap transition-all h-9 gap-1.5 px-2.5 hover:bg-neutral-700"
          >
            下载体验
          </a>
        </div>
      )}
    </header>
  );
}
