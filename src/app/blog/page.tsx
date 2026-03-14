import Link from "next/link";
import ArticleImage from "@/components/blog/ArticleImage";
import { getAllPostsMeta } from "@/lib/blog";

export const metadata = {
  title: "Blog",
  description: "Essays, frameworks, and build logs from Founder Glenn.",
  alternates: {
    canonical: "/blog",
  },
};

export default async function BlogPage() {
  const posts = await getAllPostsMeta();
  const [leadPost, ...otherPosts] = posts;

  const formatDate = (dateValue: string) =>
    new Date(dateValue).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <main className="min-h-screen bg-[#121212] px-6 py-16 text-zinc-100 md:py-20">
      <div className="mx-auto max-w-6xl">
        <header className="mb-12 border-b border-white/10 pb-8 md:mb-16">
          <p className="text-sm uppercase tracking-[0.14em] text-zinc-500">Editorial</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-6xl">Blog</h1>
          <p className="mt-5 max-w-2xl text-zinc-300">
            Founder Glenn essays on systems, health, leverage, and creator infrastructure.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Link
              href="/legal"
              data-analytics-cta="1"
              data-analytics-label="Blog Header Legal"
              data-analytics-destination="/legal"
              data-analytics-context="content-routing"
              className="rounded-full border border-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-zinc-200 transition-colors hover:border-white/35 hover:text-white"
            >
              Start with Legal
            </Link>
            <Link
              href="/royalties"
              data-analytics-cta="1"
              data-analytics-label="Blog Header Royalties"
              data-analytics-destination="/royalties"
              data-analytics-context="content-routing"
              className="rounded-full border border-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-zinc-200 transition-colors hover:border-white/35 hover:text-white"
            >
              Find Missing Royalties
            </Link>
            <Link
              href="/NexusBodyOS"
              data-analytics-cta="1"
              data-analytics-label="Blog Header Nexus"
              data-analytics-destination="/NexusBodyOS"
              data-analytics-context="content-routing"
              className="rounded-full border border-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-zinc-200 transition-colors hover:border-white/35 hover:text-white"
            >
              Explore Nexus
            </Link>
          </div>
        </header>

        {leadPost ? (
          <section className="mb-14 border-b border-white/10 pb-12">
            <article className="grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_minmax(0,0.9fr)] lg:items-center">
              {leadPost.coverImage ? (
                <Link href={`/blog/${leadPost.slug}`} className="block overflow-hidden border border-white/10">
                  <ArticleImage
                    src={leadPost.coverImage}
                    alt={leadPost.title}
                    className="aspect-[16/10] w-full transition-transform duration-500 ease-out hover:scale-[1.01]"
                  />
                </Link>
              ) : null}
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">Featured Story</p>
                <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-white md:text-5xl">
                  <Link href={`/blog/${leadPost.slug}`} className="hover:text-zinc-200">
                    {leadPost.title}
                  </Link>
                </h2>
                <p className="mt-4 text-base leading-relaxed text-zinc-300">{leadPost.description}</p>
                <p className="mt-6 text-sm text-zinc-400">
                  By {leadPost.author} - {formatDate(leadPost.date)}
                </p>
                <Link
                  href={`/blog/${leadPost.slug}`}
                  className="mt-5 inline-flex items-center text-sm font-semibold tracking-wide text-white transition-colors hover:text-zinc-300"
                >
                  Read More
                </Link>
              </div>
            </article>
          </section>
        ) : null}

        <section className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {otherPosts.map((post) => (
            <article key={post.slug} className="border border-white/10 bg-white/[0.02]">
              {post.coverImage ? (
                <Link href={`/blog/${post.slug}`} className="block overflow-hidden border-b border-white/10">
                  <ArticleImage
                    src={post.coverImage}
                    alt={post.title}
                    className="aspect-[16/10] w-full transition-transform duration-500 ease-out hover:scale-[1.02]"
                  />
                </Link>
              ) : null}
              <div className="p-6">
                <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">{formatDate(post.date)}</p>
                <h3 className="mt-3 text-2xl font-semibold leading-tight text-white">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="transition-colors hover:text-zinc-200"
                  >
                    {post.title}
                  </Link>
                </h3>
                <p className="mt-3 leading-relaxed text-zinc-300">{post.description}</p>
                <p className="mt-5 text-sm text-zinc-400">By {post.author}</p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-4 inline-flex items-center text-sm font-semibold tracking-wide text-white transition-colors hover:text-zinc-300"
                >
                  Read More
                </Link>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
