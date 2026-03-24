import type { Metadata } from "next";
import Link from "next/link";
import { NexusBodyOSAtmosphere } from "@/components/NexusBodyOSAtmosphere";
import { buildAbsoluteUrl, resolveOgImage, seoConfig } from "@/lib/seo";

export const NEXUS_BASE_PATH = "/NexusBodyOS";
export const NEXUS_SUPPORT_EMAIL = "support@founderglenn.com";
export const NEXUS_BUSINESS_EMAIL = "business@founderglenn.com";

export const NEXUS_LINKS = [
  { label: "Nexus BodyOS", href: "/NexusBodyOS" },
  { label: "Business", href: "/NexusBodyOS/business" },
  { label: "Features", href: "/NexusBodyOS/features" },
  { label: "Discord", href: "/NexusBodyOS/discord" },
  { label: "Privacy", href: "/NexusBodyOS/privacy" },
  { label: "Terms", href: "/NexusBodyOS/terms" },
  { label: "Support", href: "/NexusBodyOS/support" },
  { label: "FAQ", href: "/NexusBodyOS/faq" },
  { label: "Subscription", href: "/NexusBodyOS/subscription" },
  { label: "Updates", href: "/NexusBodyOS/updates" },
  { label: "Delete Data", href: "/NexusBodyOS/delete-data" },
  { label: "About", href: "/NexusBodyOS/about" },
  { label: "Contact", href: "/NexusBodyOS/contact" },
] as const;

type NexusMetadataInput = {
  title: string;
  description: string;
  path: string;
};

export function buildNexusMetadata(input: NexusMetadataInput): Metadata {
  return {
    title: input.title,
    description: input.description,
    alternates: {
      canonical: input.path,
    },
    openGraph: {
      type: "website",
      url: buildAbsoluteUrl(input.path),
      siteName: seoConfig.siteName,
      title: input.title,
      description: input.description,
      images: [{ url: resolveOgImage() }],
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
      images: [resolveOgImage()],
    },
  };
}

type NexusPageShellProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

export function NexusPageShell({ title, description, children }: NexusPageShellProps) {
  return (
    <main className="relative min-h-screen bg-[#09090b] text-zinc-100">
      <NexusBodyOSAtmosphere />

      <section className="relative px-6 pb-12 pt-20 md:px-10 md:pt-24">
        <div className="relative mx-auto max-w-6xl">
          <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">Nexus BodyOS</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-white md:text-6xl">{title}</h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-zinc-300 md:text-lg">{description}</p>

          <nav aria-label="Nexus BodyOS section navigation" className="mt-7 flex flex-wrap gap-2">
            {NEXUS_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full border border-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-zinc-200 transition-colors hover:border-white/35 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </section>

      <section className="px-6 pb-16 md:px-10 md:pb-20">
        <div className="mx-auto max-w-6xl">{children}</div>
      </section>
    </main>
  );
}
