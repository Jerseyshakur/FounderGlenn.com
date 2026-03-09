import type { Metadata } from "next";
import Image from "next/image";
import {
  buildAbsoluteUrl,
  buildProfilePageSchema,
  resolveOgImage,
  seoConfig,
} from "@/lib/seo";

const ABOUT_PATH = "/about";

export const metadata: Metadata = {
  title: "About",
  description:
    "Founder Glenn (Shakur Raqon Ziyār Glenn) is an author, technologist, and systems builder creating infrastructure for creators.",
  alternates: {
    canonical: ABOUT_PATH,
  },
  openGraph: {
    type: "profile",
    url: buildAbsoluteUrl(ABOUT_PATH),
    siteName: seoConfig.siteName,
    title: `${seoConfig.person.name} | About`,
    description:
      "Founder Glenn (Shakur Raqon Ziyār Glenn) is an author, technologist, and systems builder creating infrastructure for creators.",
    images: [{ url: resolveOgImage(seoConfig.person.image) }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${seoConfig.person.name} | About`,
    description:
      "Founder Glenn (Shakur Raqon Ziyār Glenn) is an author, technologist, and systems builder creating infrastructure for creators.",
    images: [resolveOgImage(seoConfig.person.image)],
  },
};

export default function AboutPage() {
  const profileSchema = buildProfilePageSchema(ABOUT_PATH);

  return (
    <main className="min-h-screen bg-black px-6 py-20 text-zinc-100">
      <script
        id="profile-page-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profileSchema) }}
      />

      <article className="mx-auto max-w-[900px] py-4 md:py-10">
        <section className="mx-auto mb-10 w-full max-w-[620px]">
          <Image
            src="/aboutmefg.png"
            alt="Founder Glenn portrait"
            width={1240}
            height={1640}
            priority
            className="h-auto w-full rounded-xl shadow-[0_40px_90px_rgba(255,255,255,0.08)]"
          />
        </section>

        <header className="mb-10 text-center">
          <h1 className="text-5xl font-bold tracking-tight text-white md:text-6xl">Founder Glenn</h1>
          <h2 className="mt-4 text-xl font-medium tracking-wide text-zinc-300 md:text-2xl">
            Shakur Raqon Ziyār Glenn
          </h2>
        </header>

        <section className="mx-auto max-w-[720px] px-0 md:px-6">
          <div className="space-y-8 text-lg leading-[1.75] text-gray-300">
            <p>
              Founder Glenn — born Shakur Raqon Ziyār Glenn — did not begin his journey in boardrooms
              or venture studios. His story started the way many creator stories do: in rooms filled
              with unfinished ideas, late nights, and a deep frustration with systems that seemed designed
              to benefit everyone except the people doing the work.
            </p>
            <p>
              From an early point in his career, Glenn found himself inside the machinery of the creative
              economy — music studios, publishing spaces, and entrepreneurial circles where talent was
              abundant but ownership was rare. He watched artists build culture while contracts quietly
              redirected the value elsewhere.
            </p>
            <p>That realization became the turning point.</p>
            <p>
              Instead of simply participating in the system, Glenn began studying it — dissecting contracts,
              distribution structures, publishing frameworks, and the hidden infrastructure that determined
              who actually owned the work once the applause faded.
            </p>
            <p>What began as personal research soon evolved into something larger.</p>
            <p>Glenn started writing.</p>
            <p>
              His books — including Sign Here: The Blueprint Decoded and How to Become a Mogul While
              Falling in Love — blend cultural storytelling with practical strategy, translating complex
              business and legal concepts into language creators can actually use. They are part memoir,
              part manual, and part blueprint for artists determined to keep control of their work.
            </p>
            <p>But writing was only the first step.</p>
            <p>
              Glenn’s work expanded into building systems designed to give creators structural leverage —
              platforms, frameworks, and publishing ecosystems meant to replace guesswork with ownership.
              Projects like Nexus HealthKit, GLÈNN, and a growing catalog of digital kits, essays, and
              comics form the foundation of a broader mission: creating tools that help independent creators
              operate with the strategic clarity of institutions.
            </p>
            <p>
              Today, Founder Glenn operates at the intersection of publishing, technology, and creator
              infrastructure, focusing on long-horizon systems that reward discipline, ownership, and
              intellectual property.
            </p>
            <p>His philosophy is simple:</p>
            <p>Creators shouldn’t just produce culture.</p>
            <p>They should own the architecture behind it.</p>
            <p>
              Through writing, software, and strategic frameworks, Glenn continues building infrastructure
              that allows creators to protect their leverage, scale their ideas, and turn creative output
              into generational assets.
            </p>
          </div>
        </section>
      </article>
    </main>
  );
}
