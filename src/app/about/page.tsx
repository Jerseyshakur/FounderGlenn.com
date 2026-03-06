import type { Metadata } from "next";
import {
  buildAbsoluteUrl,
  buildProfilePageSchema,
  resolveOgImage,
  seoConfig,
} from "@/lib/seo";

const ABOUT_PATH = "/about";

export const metadata: Metadata = {
  title: "About",
  description: seoConfig.person.description,
  alternates: {
    canonical: ABOUT_PATH,
  },
  openGraph: {
    type: "profile",
    url: buildAbsoluteUrl(ABOUT_PATH),
    siteName: seoConfig.siteName,
    title: `${seoConfig.person.name} | About`,
    description: seoConfig.person.description,
    images: [{ url: resolveOgImage(seoConfig.person.image) }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${seoConfig.person.name} | About`,
    description: seoConfig.person.description,
    images: [resolveOgImage(seoConfig.person.image)],
  },
};

export default function AboutPage() {
  const profileSchema = buildProfilePageSchema(ABOUT_PATH);

  return (
    <main className="min-h-screen bg-[#121212] px-6 py-20 text-zinc-100">
      <script
        id="profile-page-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profileSchema) }}
      />

      <article className="mx-auto max-w-4xl border border-white/10 bg-white/[0.02] p-10 md:p-14">
        <p className="text-sm uppercase tracking-[0.12em] text-zinc-500">About</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
          {seoConfig.person.name}
        </h1>
        <p className="mt-4 text-zinc-400">{seoConfig.person.alternateName}</p>
        <p className="mt-6 max-w-3xl text-zinc-300">{seoConfig.person.description}</p>
      </article>
    </main>
  );
}
