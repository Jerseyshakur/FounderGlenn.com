import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CoverImage from "@/components/CoverImage";
import ShopifyProductDetail from "@/components/shopify/ShopifyProductDetail";
import { KITS } from "@/content/kits";
import { buildAbsoluteUrl, resolveOgImage, seoConfig } from "@/lib/seo";
import { getShopifyProductByHandle } from "@/lib/shopify";

type KitPageProps = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  return KITS.map((kit) => ({ slug: kit.slug }));
}

export async function generateMetadata({ params }: KitPageProps) {
  const shopifyProduct = await getShopifyProductByHandle(params.slug);
  if (shopifyProduct) {
    const path = `/kits/${shopifyProduct.handle}`;
    const title = `${shopifyProduct.title} | Kits`;
    const description = shopifyProduct.description || `${shopifyProduct.title} toolkit by ${seoConfig.person.name}.`;
    return {
      title,
      description,
      alternates: { canonical: path },
      openGraph: {
        type: "website",
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

  const kit = KITS.find((entry) => entry.slug === params.slug);
  if (!kit) {
    return {};
  }

  const path = `/kits/${kit.slug}`;
  const title = `${kit.title} | Kits`;
  const description = `${kit.title} toolkit by ${seoConfig.person.name}.`;
  const ogImage = resolveOgImage(kit.coverSrc);

  return {
    title,
    description,
    alternates: { canonical: path },
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

export default async function KitDetailPage({ params }: KitPageProps) {
  const shopifyProduct = await getShopifyProductByHandle(params.slug);
  if (shopifyProduct) {
    return (
      <ShopifyProductDetail
        handle={shopifyProduct.handle}
        kindLabel="Kit"
        backHref="/kits"
        backLabel="Back to Kits"
      />
    );
  }

  const kit = KITS.find((entry) => entry.slug === params.slug);
  if (!kit) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#121212] px-6 py-20 text-zinc-100">
      <div className="mx-auto max-w-4xl border border-white/10 bg-white/[0.02] p-8 md:p-12">
        <p className="text-sm uppercase tracking-[0.12em] text-zinc-500">Kit</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl">{kit.title}</h1>

        <div className="mt-8 max-w-sm">
          <CoverImage kind="kits" slug={kit.slug} title={kit.title} src={kit.coverSrc} />
        </div>

        <Link
          href="/kits"
          className="mt-10 inline-flex rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-black"
        >
          Back to Kits
        </Link>
      </div>
    </main>
  );
}
