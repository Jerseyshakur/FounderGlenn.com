import type { Metadata } from "next";
import { BOOKS } from "@/content/books";
import Link from "next/link";
import { notFound } from "next/navigation";
import ShopifyProductDetail from "@/components/shopify/ShopifyProductDetail";
import { buildAbsoluteUrl, resolveOgImage, seoConfig } from "@/lib/seo";
import { getShopifyProductByHandle } from "@/lib/shopify";

type EssayPageProps = {
  params: {
    slug: string;
  };
};

const essaysCatalog = BOOKS.filter((book) => book.category === "essays");

export async function generateStaticParams() {
  return essaysCatalog.map((essay) => ({ slug: essay.slug }));
}

export async function generateMetadata({ params }: EssayPageProps) {
  const shopifyProduct = await getShopifyProductByHandle(params.slug);
  if (shopifyProduct) {
    const path = `/essays/${shopifyProduct.handle}`;
    const title = `${shopifyProduct.title} | Essays`;
    const description = shopifyProduct.description || `${shopifyProduct.title} by ${seoConfig.person.name}.`;
    return {
      title,
      description,
      alternates: {
        canonical: path,
      },
      openGraph: {
        type: "article",
        url: buildAbsoluteUrl(path),
        siteName: seoConfig.siteName,
        title,
        description,
        images: [{ url: resolveOgImage() }],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [resolveOgImage()],
      },
    } satisfies Metadata;
  }

  const essay = essaysCatalog.find((entry) => entry.slug === params.slug);
  if (!essay) {
    return {};
  }

  const path = `/essays/${essay.slug}`;
  const title = `${essay.title} | Essays`;
  const description = `${essay.title} by ${seoConfig.person.name}.`;
  const ogImage = resolveOgImage(essay.coverSrc);

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "article",
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

export default async function EssayPage({ params }: EssayPageProps) {
  const shopifyProduct = await getShopifyProductByHandle(params.slug);
  if (shopifyProduct) {
    return (
      <ShopifyProductDetail
        handle={shopifyProduct.handle}
        kindLabel="Essay"
        backHref="/essays"
        backLabel="Back to Essays"
      />
    );
  }

  const essay = essaysCatalog.find((entry) => entry.slug === params.slug);

  if (!essay) {
    notFound();
  }

  const essaySchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: essay.title,
    description: `${essay.title} by ${seoConfig.person.name}.`,
    url: buildAbsoluteUrl(`/essays/${essay.slug}`),
    image: resolveOgImage(essay.coverSrc),
    author: {
      "@type": "Person",
      name: seoConfig.person.name,
      alternateName: seoConfig.person.alternateName,
      url: seoConfig.person.url,
    },
    inLanguage: "en-US",
  };

  return (
    <main className="min-h-screen bg-[#121212] px-6 py-20 text-zinc-100">
      <article className="mx-auto max-w-3xl border border-white/10 bg-white/[0.02] p-10 md:p-14">
        <script
          id="essay-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(essaySchema) }}
        />

        <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">Essay</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-5xl">{essay.title}</h1>
        <p className="mt-4 text-sm uppercase tracking-[0.12em] text-zinc-500">Founder Glenn</p>
        <p className="mt-6 text-lg text-zinc-400">Coming Soon</p>

        <Link
          href="/essays"
          className="mt-10 inline-flex rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-black"
        >
          Back to Essays
        </Link>
      </article>
    </main>
  );
}
