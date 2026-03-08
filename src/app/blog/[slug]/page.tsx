import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArticleBody from "@/components/blog/ArticleBody";
import ArticleHero from "@/components/blog/ArticleHero";
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
    <main className="min-h-screen bg-[#121212] py-10 text-zinc-100 md:py-14">
      <article>
        <script
          id="article-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />

        <ArticleHero
          title={post.title}
          subtitle={post.description}
          date={post.date}
          author={post.author}
          coverImage={post.coverImage}
        />
        <ArticleBody html={post.contentHtml} />

        <section className="mx-auto mt-16 w-full max-w-3xl px-6">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8">
            <p className="text-sm uppercase tracking-[0.12em] text-zinc-500">Next Step</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">Continue with the Books</h2>
            <p className="mt-3 text-zinc-300">
              If this article resonated, the books go deeper with full frameworks and execution maps.
            </p>
            <Link
              href="/books"
              className="mt-6 inline-flex rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-black"
            >
              Visit Books
            </Link>
          </div>
        </section>
      </article>
    </main>
  );
}
