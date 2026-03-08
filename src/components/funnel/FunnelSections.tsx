import type {
  FunnelAuthorityData,
  FunnelCtaData,
  FunnelFaqData,
  FunnelHeroData,
  FunnelLeadCaptureData,
  FunnelOfferData,
  FunnelOfferStackData,
  FunnelProblemData,
  FunnelTransformationData,
  FunnelUpsellData,
} from "@/components/funnel/types";
import { FunnelActionButton, FunnelSection, FunnelSectionHeader } from "@/components/funnel/FunnelPrimitives";
import CoverImage from "@/components/CoverImage";
import LegalLeadCaptureForm from "@/components/funnel/LegalLeadCaptureForm";

export function FunnelHeroSection({ data }: { data: FunnelHeroData }) {
  return (
    <FunnelSection className="pt-10 md:pt-14">
      <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-[1fr_minmax(0,320px)] md:items-start">
        <div>
          <FunnelSectionHeader eyebrow={data.eyebrow} title={data.title} description={data.subtitle} />
          <div className="mt-7 flex flex-wrap gap-3">
            {data.primaryAction ? <FunnelActionButton action={data.primaryAction} /> : null}
            {data.secondaryAction ? <FunnelActionButton action={data.secondaryAction} variant="secondary" /> : null}
          </div>
          {data.proofPoints?.length ? (
            <ul className="mt-8 grid gap-2 text-sm text-zinc-300 sm:grid-cols-2">
              {data.proofPoints.map((point) => (
                <li key={point} className="rounded-full border border-white/10 bg-black/25 px-4 py-2">
                  {point}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        {data.media ? (
          <figure className="mx-auto w-full max-w-[320px]">
            <CoverImage kind="kits" slug="funnel-hero" title={data.media.alt} src={data.media.src} alt={data.media.alt} />
            {data.media.caption ? <figcaption className="mt-3 text-center text-xs text-zinc-400">{data.media.caption}</figcaption> : null}
          </figure>
        ) : null}
      </div>
    </FunnelSection>
  );
}

export function FunnelProblemSection({ data }: { data: FunnelProblemData }) {
  return (
    <FunnelSection>
      <FunnelSectionHeader eyebrow={data.eyebrow} title={data.title} description={data.description} />
      <ul className="mt-6 grid gap-3 md:grid-cols-2">
        {data.points.map((point) => (
          <li key={point} className="rounded-2xl border border-white/10 bg-black/20 p-4 text-zinc-200">
            {point}
          </li>
        ))}
      </ul>
    </FunnelSection>
  );
}

export function FunnelOfferContentsSection({ data }: { data: FunnelOfferData }) {
  return (
    <FunnelSection>
      <FunnelSectionHeader eyebrow={data.eyebrow} title={data.title} description={data.description} />
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {data.items.map((item) => (
          <article key={item.title} className="rounded-2xl border border-white/10 bg-black/20 p-5">
            <h3 className="text-lg font-semibold tracking-tight text-white">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-300">{item.description}</p>
          </article>
        ))}
      </div>
    </FunnelSection>
  );
}

export function FunnelAuthoritySection({ data }: { data: FunnelAuthorityData }) {
  return (
    <FunnelSection>
      <FunnelSectionHeader eyebrow={data.eyebrow} title={data.title} />
      <div className="mt-5 grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
        <p className="text-zinc-300">{data.body}</p>
        <div className="space-y-4">
          {data.quote ? (
            <blockquote className="rounded-2xl border border-white/10 bg-black/25 p-4 text-zinc-200">
              <p>{data.quote}</p>
              {data.quoteAttribution ? <cite className="mt-3 block text-xs text-zinc-400">{data.quoteAttribution}</cite> : null}
            </blockquote>
          ) : null}
          {data.trustPoints?.length ? (
            <ul className="space-y-2 text-sm text-zinc-300">
              {data.trustPoints.map((point) => (
                <li key={point} className="rounded-xl border border-white/10 bg-black/20 px-3 py-2">
                  {point}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </FunnelSection>
  );
}

export function FunnelOfferStackSection({ data }: { data: FunnelOfferStackData }) {
  return (
    <FunnelSection>
      <FunnelSectionHeader eyebrow={data.eyebrow} title={data.title} description={data.subtitle} />
      <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-5 md:p-7">
        <ul className="space-y-3">
          {data.items.map((item) => (
            <li key={item.label} className="flex flex-col justify-between gap-1 border-b border-white/10 pb-3 text-sm last:border-none last:pb-0 sm:flex-row sm:items-center sm:gap-4">
              <span className="font-medium text-white">{item.label}</span>
              {item.detail ? <span className="text-zinc-400">{item.detail}</span> : null}
            </li>
          ))}
        </ul>
      </div>
    </FunnelSection>
  );
}

export function FunnelTransformationSection({ data }: { data: FunnelTransformationData }) {
  return (
    <FunnelSection>
      <FunnelSectionHeader eyebrow={data.eyebrow} title={data.title} />
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <article className="rounded-2xl border border-white/10 bg-black/20 p-5">
          <p className="text-xs uppercase tracking-[0.12em] text-zinc-500">{data.beforeLabel ?? "Before"}</p>
          <ul className="mt-3 space-y-2 text-zinc-300">
            {data.beforePoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </article>
        <article className="rounded-2xl border border-white/10 bg-white/[0.05] p-5">
          <p className="text-xs uppercase tracking-[0.12em] text-zinc-400">{data.afterLabel ?? "After"}</p>
          <ul className="mt-3 space-y-2 text-white">
            {data.afterPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </article>
      </div>
    </FunnelSection>
  );
}

export function FunnelCtaSection({ data }: { data: FunnelCtaData }) {
  return (
    <FunnelSection className="text-center">
      <FunnelSectionHeader eyebrow={data.eyebrow} title={data.title} description={data.body} align="center" />
      <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
        <FunnelActionButton action={data.primaryAction} />
        {data.secondaryAction ? <FunnelActionButton action={data.secondaryAction} variant="secondary" /> : null}
      </div>
    </FunnelSection>
  );
}

export function FunnelUpsellSection({ data }: { data: FunnelUpsellData }) {
  return (
    <FunnelSection>
      <FunnelSectionHeader eyebrow={data.eyebrow} title={data.title} description={data.description} />
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {data.items.map((item) => (
          <article key={item.title} className="rounded-2xl border border-white/10 bg-black/20 p-5">
            <h3 className="text-base font-semibold text-white">{item.title}</h3>
            <p className="mt-2 text-sm text-zinc-300">{item.description}</p>
            {item.action ? (
              <div className="mt-4">
                <FunnelActionButton action={item.action} variant="secondary" className="w-full" />
              </div>
            ) : null}
          </article>
        ))}
      </div>
    </FunnelSection>
  );
}

export function FunnelFaqSection({ data }: { data: FunnelFaqData }) {
  return (
    <FunnelSection>
      <FunnelSectionHeader eyebrow={data.eyebrow} title={data.title} />
      <div className="mt-6 space-y-3">
        {data.items.map((item) => (
          <details key={item.question} className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <summary className="cursor-pointer list-none text-sm font-semibold text-white">{item.question}</summary>
            <p className="mt-3 text-sm leading-relaxed text-zinc-300">{item.answer}</p>
          </details>
        ))}
      </div>
    </FunnelSection>
  );
}

export function FunnelLeadCaptureSection({ data, funnelSlug }: { data: FunnelLeadCaptureData; funnelSlug?: string }) {
  return (
    <FunnelSection>
      <FunnelSectionHeader eyebrow={data.eyebrow} title={data.title} description={data.body} />
      {funnelSlug === "legal" ? (
        <LegalLeadCaptureForm ctaLabel={data.ctaLabel} placeholder={data.placeholder} />
      ) : (
        <form
          method="post"
          action={data.formActionUrl}
          className="mt-6 flex flex-col gap-3 sm:flex-row"
        >
          <input
            type="email"
            name="email"
            placeholder={data.placeholder ?? "Enter your email"}
            required
            className="h-11 flex-1 rounded-full border border-white/15 bg-black/30 px-5 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-white/35 focus:outline-none"
          />
          <button
            type="submit"
            className="inline-flex h-11 items-center justify-center rounded-full border border-white/20 bg-white px-6 text-sm font-semibold text-black transition-colors hover:bg-zinc-200"
          >
            {data.ctaLabel ?? "Get the Guide"}
          </button>
        </form>
      )}
      {data.integrationNote ? <p className="mt-3 text-xs text-zinc-500">{data.integrationNote}</p> : null}
    </FunnelSection>
  );
}
