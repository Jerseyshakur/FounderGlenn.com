import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import gfm from "remark-gfm";
import html from "remark-html";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

type Frontmatter = {
  title?: string;
  date?: string;
  description?: string;
  cover?: string;
  image?: string;
  thumbnail?: string;
  coverImage?: string;
};

export type BlogPostMeta = {
  slug: string;
  title: string;
  date: string;
  description: string;
  coverImage: string;
};

export type BlogPost = BlogPostMeta & {
  contentHtml: string;
};

function byDateDescending<T extends { date: string }>(a: T, b: T) {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
}

function extractFirstImageUrl(content: string): string {
  const markdownImageMatch = content.match(/!\[[^\]]*\]\((https?:\/\/[^)\s]+(?:\s+["'][^"']*["'])?)\)/i);
  if (markdownImageMatch?.[1]) {
    return markdownImageMatch[1].split(/\s+["']/)[0];
  }

  const htmlImageMatch = content.match(/<img[^>]*src=["'](https?:\/\/[^"']+)["']/i);
  if (htmlImageMatch?.[1]) {
    return htmlImageMatch[1];
  }

  return "";
}

function resolveThumbnail(data: Frontmatter, content: string): string {
  return data.cover ?? data.image ?? data.thumbnail ?? data.coverImage ?? extractFirstImageUrl(content);
}

function toMeta(slug: string, data: Frontmatter, content: string): BlogPostMeta {
  return {
    slug,
    title: data.title ?? "Untitled",
    date: data.date ?? "",
    description: data.description ?? "",
    coverImage: resolveThumbnail(data, content),
  };
}

export async function getAllPostSlugs(): Promise<string[]> {
  const files = await fs.readdir(BLOG_DIR);
  return files.filter((file) => file.endsWith(".md")).map((file) => file.replace(/\.md$/, ""));
}

export async function getAllPostsMeta(): Promise<BlogPostMeta[]> {
  const slugs = await getAllPostSlugs();

  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const filePath = path.join(BLOG_DIR, `${slug}.md`);
      const source = await fs.readFile(filePath, "utf8");
      const { data, content } = matter(source);
      return toMeta(slug, data as Frontmatter, content);
    }),
  );

  return posts.sort(byDateDescending);
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const filePath = path.join(BLOG_DIR, `${slug}.md`);
    const source = await fs.readFile(filePath, "utf8");
    const { data, content } = matter(source);

    const processed = await remark().use(gfm).use(html).process(content);
    const contentHtml = processed.toString();
    const meta = toMeta(slug, data as Frontmatter, content);

    return {
      ...meta,
      contentHtml,
    };
  } catch {
    return null;
  }
}
