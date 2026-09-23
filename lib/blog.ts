import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import type { Root } from "mdast";
import { visit } from "unist-util-visit";
import Slugger from "github-slugger";

/**
 * Blog utilities for SSG.
 * Reads Markdown files from `content/blog/` at build time,
 * parses frontmatter via gray-matter, and returns post metadata/content.
 */

const blogDir = path.join(process.cwd(), "content/blog");

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
};

/** Returns all posts sorted by date descending (content excluded for list pages). */
export function getAllPosts(): Omit<BlogPost, "content">[] {
  if (!fs.existsSync(blogDir)) return [];
  const files = fs.readdirSync(blogDir);
  return files
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const slug = f.replace(/\.md$/, "");
      const source = fs.readFileSync(path.join(blogDir, f), "utf-8");
      const { data } = matter(source);
      return {
        slug,
        title: data.title || slug,
        date: data.date || "",
        excerpt: data.excerpt || "",
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

/** Returns a single post by slug, including raw Markdown content for rendering. */
export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(blogDir, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const source = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(source);
  return {
    slug,
    title: data.title || slug,
    date: data.date || "",
    excerpt: data.excerpt || "",
    content,
  };
}

export type RenderedHeading = {
  slug: string;
  text: string;
  level: number;
};

export type RenderedPost = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  html: string;
  headings: RenderedHeading[];
};

/**
 * 全部文章 + 构建期渲染好的 HTML 与标题树（供首页博客阅读器客户端切换，无需二次请求）。
 * 管线与 blog/[slug] 页一致（gfm → rehype → highlight/slug）。
 * 标题树用同一把 github-slugger 按文档序编号，slug 与 rehypeSlug 生成的 id 天然一致。
 */
export async function getRenderedPosts(): Promise<RenderedPost[]> {
  const posts = getAllPosts();
  return Promise.all(
    posts.map(async (p) => {
      const full = getPostBySlug(p.slug);
      const headings: RenderedHeading[] = [];
      const slugger = new Slugger();
      const result = await remark()
        .use(remarkGfm)
        .use(() => (tree: Root) => {
          visit(tree, "heading", (node) => {
            const text = node.children.map((c) => ("value" in c ? c.value : "")).join("");
            headings.push({ level: node.depth, text, slug: slugger.slug(text) });
          });
        })
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypeSlug)
        .use(rehypeHighlight)
        .use(rehypeStringify, { allowDangerousHtml: true })
        .process(full?.content ?? "");
      return {
        slug: p.slug,
        title: p.title,
        date: p.date,
        excerpt: p.excerpt,
        html: result.toString(),
        headings: headings.filter((h) => h.level === 2 || h.level === 3),
      };
    }),
  );
}
