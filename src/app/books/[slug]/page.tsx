import type { Metadata } from "next";
import { BOOKS } from "@/content/books";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import CoverImage from "@/components/CoverImage";
import {
  buildAbsoluteUrl,
  buildBookSchema,
  resolveOgImage,
  seoConfig,
} from "@/lib/seo";

type BookPageProps = {
  params: {
    slug: string;
  };
};

const booksCatalog = BOOKS.filter((entry) => entry.category !== "essays");

export async function generateStaticParams() {
  return booksCatalog.map((book) => ({ slug: book.slug }));
}

export async function generateMetadata({ params }: BookPageProps) {
  const book = booksCatalog.find((entry) => entry.slug === params.slug);
  if (!book) {
    return {};
  }

  const path = `/books/${book.slug}`;
  const title = `${book.title} | Books`;
  const description = `${book.title} by ${seoConfig.person.name}.`;
  const ogImage = resolveOgImage(book.coverSrc);

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "website",
      url: buildAbsoluteUrl(path),
      siteName: seoConfig.siteName,
      title,
      description,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  } satisfies Metadata;
}

export default function BookPage({ params }: BookPageProps) {
  const book = booksCatalog.find((entry) => entry.slug === params.slug);

  if (!book) {
    const essay = BOOKS.find((entry) => entry.slug === params.slug && entry.category === "essays");
    if (essay) {
      redirect(`/essays/${essay.slug}`);
    }
  }

  if (!book) {
    notFound();
  }

  const bookSchema = buildBookSchema({
    urlPath: `/books/${book.slug}`,
    name: book.title,
    description: `${book.title} by ${seoConfig.person.name}.`,
    image: book.coverSrc,
    inLanguage: "en-US",
    bookFormat: "https://schema.org/EBook",
    publisher: seoConfig.organization.name,
  });

  return (
    <main className="min-h-screen bg-[#121212] px-6 py-20 text-zinc-100">
      <article className="mx-auto max-w-3xl border border-white/10 bg-white/[0.02] p-10 md:p-14">
        <script
          id="book-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(bookSchema) }}
        />

        <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">Book</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-5xl">{book.title}</h1>
        <p className="mt-6 text-lg text-zinc-400">Coming Soon</p>

        <div className="mt-8 max-w-xs">
          <CoverImage kind="books" slug={book.slug} title={book.title} src={book.coverSrc} />
        </div>

        <Link
          href="/books/books"
          className="mt-10 inline-flex rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-black"
        >
          Back to Books
        </Link>
      </article>
    </main>
  );
}
