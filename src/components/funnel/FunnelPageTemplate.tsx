import type { FunnelPageConfig } from "@/components/funnel/types";
import Link from "next/link";
import FunnelProgressTracker from "@/components/analytics/FunnelProgressTracker";
import {
  FunnelAuthoritySection,
  FunnelCtaSection,
  FunnelFaqSection,
  FunnelHeroSection,
  FunnelLeadCaptureSection,
  FunnelOfferContentsSection,
  FunnelOfferStackSection,
  FunnelProblemSection,
  FunnelTransformationSection,
  FunnelUpsellSection,
} from "@/components/funnel/FunnelSections";

type FunnelPageTemplateProps = {
  config: FunnelPageConfig;
};

export default function FunnelPageTemplate({ config }: FunnelPageTemplateProps) {
  return (
    <main
      className="min-h-screen bg-[#121212] px-4 py-10 text-zinc-100 sm:px-6 md:py-16"
      data-funnel-slug={config.slug}
    >
      <FunnelProgressTracker funnel={config.slug} />
      <div className="mx-auto max-w-6xl space-y-5 md:space-y-6">
        <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500">
          <Link href="/" className="rounded-full border border-white/10 px-3 py-1 transition-colors hover:text-zinc-300">
            Founder Glenn
          </Link>
          <Link href="/books" className="rounded-full border border-white/10 px-3 py-1 transition-colors hover:text-zinc-300">
            Books
          </Link>
          <Link href="/kits" className="rounded-full border border-white/10 px-3 py-1 transition-colors hover:text-zinc-300">
            Kits
          </Link>
        </div>
        <FunnelHeroSection data={config.hero} />
        {config.problem ? <FunnelProblemSection data={config.problem} /> : null}
        {config.offer ? <FunnelOfferContentsSection data={config.offer} /> : null}
        {config.offerStack ? <FunnelOfferStackSection data={config.offerStack} /> : null}
        {config.authority ? <FunnelAuthoritySection data={config.authority} /> : null}
        {config.transformation ? <FunnelTransformationSection data={config.transformation} /> : null}
        {config.cta ? <FunnelCtaSection data={config.cta} /> : null}
        {config.upsells ? <FunnelUpsellSection data={config.upsells} /> : null}
        {config.faq ? <FunnelFaqSection data={config.faq} /> : null}
        {config.leadCapture ? <FunnelLeadCaptureSection data={config.leadCapture} funnelSlug={config.slug} /> : null}
      </div>
    </main>
  );
}
