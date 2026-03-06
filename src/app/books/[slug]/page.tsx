import { BOOKS } from "@/content/books";
import Link from "next/link";
import { notFound } from "next/navigation";

type BookPageProps = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  return BOOKS.map((book) => ({ slug: book.slug }));
}

export async function generateMetadata({ params }: BookPageProps) {
  const book = BOOKS.find((entry) => entry.slug === params.slug);
  if (!book) {
    return {};
  }

  return {
    title: `${book.title} | Founder Glenn`,
    description: `${book.title} is coming soon.`,
  };
}

export default function BookPage({ params }: BookPageProps) {
  const book = BOOKS.find((entry) => entry.slug === params.slug);

  if (!book) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#121212] px-6 py-20 text-zinc-100">
      <article className="mx-auto max-w-3xl border border-white/10 bg-white/[0.02] p-10 md:p-14">
        <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">Book</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-5xl">{book.title}</h1>
        <p className="mt-6 text-lg text-zinc-400">Coming Soon</p>

        <Link
          href="/books"
          className="mt-10 inline-flex rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-black"
        >
          Back to Books
        </Link>
      </article>
    </main>
  );
}
