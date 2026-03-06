import Link from "next/link";
import Image from "next/image";
import { getAllPostsMeta } from "@/lib/blog";

export const metadata = {
  title: "Blog",
  description: "Essays, frameworks, and build logs.",
};

export default async function BlogPage() {
  const posts = await getAllPostsMeta();

  return (
    <main className="min-h-screen bg-[#121212] px-6 py-20 text-zinc-100">
      <div className="mx-auto max-w-4xl">
        <header className="mb-14 border-b border-white/10 pb-8">
          <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">Blog</h1>
          <p className="mt-4 max-w-2xl text-zinc-400">
            Dispatches on systems, creativity, and infrastructure that compounds.
          </p>
        </header>

        <section className="space-y-10">
          {posts.map((post) => (
            <article key={post.slug} className="border-b border-white/10 pb-10">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-[minmax(0,1fr)_220px] md:items-center md:gap-10">
                <div>
                  <p className="text-sm uppercase tracking-[0.12em] text-zinc-500">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>

                  <h2 className="mt-3 text-2xl font-semibold text-white md:text-3xl">{post.title}</h2>

                  <p className="mt-3 leading-relaxed text-zinc-400">{post.description}</p>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-5 inline-flex items-center text-sm font-semibold tracking-wide text-white transition-colors hover:text-zinc-300"
                  >
                    Read More
                  </Link>
                </div>

                {post.coverImage ? (
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group relative block h-[140px] w-full max-w-[220px] overflow-hidden rounded-xl border border-white/10 justify-self-start md:justify-self-end"
                  >
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      unoptimized
                      sizes="(max-width: 768px) 100vw, 220px"
                      className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03] group-hover:opacity-95"
                    />
                  </Link>
                ) : null}
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
