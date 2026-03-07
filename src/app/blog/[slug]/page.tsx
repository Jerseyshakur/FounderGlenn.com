import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPostSlugs, getPostBySlug } from "@/lib/blog";
import {
  buildAbsoluteUrl,
  buildArticleSchema,
  resolveOgImage,
  seoConfig,
} from "@/lib/seo";

type BlogPostPageProps = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const post = await getPostBySlug(params.slug);
  if (!post) {
    return {};
  }

  const path = `/blog/${post.slug}`;
  const ogImage = resolveOgImage(post.coverImage);
  const metadataTitle = post.seoTitle ? { absolute: post.seoTitle } : post.title;

  return {
    title: metadataTitle,
    description: post.seoDescription ?? post.description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "article",
      url: buildAbsoluteUrl(path),
      siteName: seoConfig.siteName,
      title: post.seoTitle ?? post.title,
      description: post.seoDescription ?? post.description,
      images: [{ url: ogImage }],
      publishedTime: post.date || undefined,
      modifiedTime: post.date || undefined,
      authors: [seoConfig.person.name],
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle ?? post.title,
      description: post.seoDescription ?? post.description,
      images: [ogImage],
    },
  } satisfies Metadata;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const articleSchema = buildArticleSchema({
    urlPath: `/blog/${post.slug}`,
    headline: post.title,
    description: post.description,
    image: post.coverImage,
    datePublished: post.date || undefined,
    dateModified: post.date || undefined,
  });

  return (
    <main className="min-h-screen bg-[#121212] px-6 py-16 text-zinc-100">
      <article className="mx-auto max-w-3xl">
        <script
          id="article-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />

        <p className="text-sm uppercase tracking-[0.12em] text-zinc-500">
          {new Date(post.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        <h1 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-5xl">{post.title}</h1>
        <p className="mt-5 text-lg text-zinc-400">{post.description}</p>

        {post.coverImage ? (
          <div className="mt-10 overflow-hidden rounded-2xl border border-white/10">
            <img src={post.coverImage} alt={post.title} className="h-auto w-full object-cover" />
          </div>
        ) : null}

        <div
          className="prose prose-invert prose-zinc mt-12 max-w-none leading-8 prose-headings:tracking-tight prose-a:text-white prose-a:no-underline hover:prose-a:text-zinc-300 prose-blockquote:border-zinc-700 prose-hr:border-zinc-800"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />

        <section className="mt-16 rounded-2xl border border-white/10 bg-white/[0.03] p-8">
          <p className="text-sm uppercase tracking-[0.12em] text-zinc-500">Next Step</p>
          <h2 className="mt-3 text-2xl font-semibold text-white">Continue with the Books</h2>
          <p className="mt-3 text-zinc-400">
            If this article resonated, the books go deeper with full frameworks and execution maps.
          </p>
          <Link
            href="/books"
            className="mt-6 inline-flex rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-black"
          >
            Visit Books
          </Link>
        </section>
      </article>
    </main>
  );
}
