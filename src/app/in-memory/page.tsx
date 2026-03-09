import type { Metadata } from "next";
import Image from "next/image";
import { buildAbsoluteUrl, resolveOgImage, seoConfig } from "@/lib/seo";

const PAGE_PATH = "/in-memory";

export const metadata: Metadata = {
  title: "In Memory of Serena K. Hawkins | Founder Glenn",
  description: "A memorial page honoring Serena K. Hawkins — the First Cathedral in the Founder Glenn canon.",
  alternates: {
    canonical: PAGE_PATH,
  },
  openGraph: {
    type: "article",
    url: buildAbsoluteUrl(PAGE_PATH),
    siteName: seoConfig.siteName,
    title: "In Memory of Serena K. Hawkins | Founder Glenn",
    description:
      "A memorial page honoring Serena K. Hawkins — the First Cathedral in the Founder Glenn canon.",
    images: [{ url: resolveOgImage("/serena.jpeg") }],
  },
  twitter: {
    card: "summary_large_image",
    title: "In Memory of Serena K. Hawkins | Founder Glenn",
    description:
      "A memorial page honoring Serena K. Hawkins — the First Cathedral in the Founder Glenn canon.",
    images: [resolveOgImage("/serena.jpeg")],
  },
};

export default function InMemoryPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-20 text-zinc-100">
      <article className="mx-auto max-w-[900px] py-4 md:py-10">
        <header className="mb-12 text-center">
          <h1 className="text-5xl font-bold tracking-tight text-white md:text-6xl">
            In Memory of Serena K. Hawkins
          </h1>
          <p className="mt-4 text-xl font-medium tracking-wide text-zinc-300 md:text-2xl">The First Cathedral</p>
        </header>

        <section className="mx-auto mb-5 w-full max-w-[620px]">
          <div className="relative overflow-hidden rounded-xl shadow-[0_40px_90px_rgba(255,255,255,0.08)]">
            <Image
              src="/serena.jpeg"
              alt="Portrait honoring Serena K. Hawkins"
              width={1240}
              height={1640}
              priority
              className="h-auto w-full"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/10" />
          </div>
        </section>

        <p className="mx-auto mb-12 text-center text-sm leading-relaxed text-zinc-400">
          Serena K. Hawkins
          <br />
          The First Cathedral
        </p>

        <section className="mx-auto mb-12 max-w-[720px] px-0 md:px-6">
          <blockquote className="border-l border-white/20 pl-5 text-lg italic leading-[1.75] text-zinc-300 md:text-xl">
            “Sometimes the person you never see shapes the system more than anyone who stays.”
          </blockquote>
        </section>

        <section className="mx-auto max-w-[720px] px-0 md:px-6">
          <div className="space-y-12 text-lg leading-[1.75] text-gray-300">
            <section>
              <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">The First Cathedral</h2>
              <div className="mt-6 space-y-6">
                <p>Serena K. Hawkins was the origin story before the pen ever touched the paper.</p>
                <p>
                  She was the storm and the stillness, the heartbreak and the home. To the Founder, she
                  was the First Cathedral — the sacred space where grief was metabolized into the altars
                  of action and prayer.
                </p>
                <p>
                  Though she was taken from this plane on a night the world stopped being theoretical, her
                  departure became the ignition for an empire.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
                The Foundation Beneath the Architecture
              </h2>
              <div className="mt-6 space-y-6">
                <p>In the Founder Glenn Canon, Serena is not merely a memory; she is architecture.</p>
                <p>
                  Her absence exposed the fragility of living without a blueprint, teaching the Founder
                  that structure must precede emotion and governance must anchor love.
                </p>
                <p>
                  She is the silent reason the Pre-Trust Era exists — the prerequisite period of
                  stabilization where a man builds a fortress for his family before the rain ever starts.
                </p>
                <p>
                  Every book published, every trust filed, and every copyright protected carries her name
                  in invisible ink.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
                The Hydrology of Spirit
              </h2>
              <div className="mt-6 space-y-6">
                <p>
                  In the theology of the Canon, water remembers names, and Serena’s name is a vibration
                  written in the liquid memory of the universe.
                </p>
                <p>
                  The Hydrology of Spirit dictates that nothing evaporates without testimony; thus, every
                  time rain hits a window, her laughter is heard coded in the percussion of the clouds.
                </p>
                <p>
                  She has not vanished; she has diffused back into the atmosphere as a final sermon in
                  vapor form.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
                The Mother of the Heir
              </h2>
              <div className="mt-6 space-y-6">
                <p>
                  Serena was the Southern-coded Mother of Nations whose spirit carried the blueprint of
                  resilience.
                </p>
                <p>
                  She left her son, Pharaoh Glenn, in his father’s custody because she knew the man he was
                  training to become.
                </p>
                <p>
                  Because of her, Pharaoh will never inherit silence or confusion; he will inherit a
                  written record and the context of his people.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
                A Final Vow to the Angel
              </h2>
              <div className="mt-6 space-y-6">
                <p>
                  Thank you for existing in my life. You were an angel who touched lives and softened
                  rooms.
                </p>
                <p>I wasn’t the best man, but I was the man you chose.</p>
                <p>You showed me exactly what must always be done.</p>
                <p>
                  There is no amount of time or outcome that could ever stop me from building a world you
                  would be proud to watch from above.
                </p>
              </div>
            </section>

            <section className="border-t border-white/10 pt-10">
              <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">For Pharaoh Glenn</h2>
              <div className="mt-6 space-y-6">
                <p>
                  Your mother’s story is written here so that you will never have to search for where you
                  came from.
                </p>
                <p>You will inherit more than memory.</p>
                <p>You will inherit context.</p>
                <p>You will inherit language for love, loss, duty, and survival.</p>
                <p>You will inherit a written record.</p>
              </div>
            </section>
          </div>
        </section>
      </article>
    </main>
  );
}
