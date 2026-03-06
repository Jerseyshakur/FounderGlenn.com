"use client";

import { useMemo, useState } from "react";

type CoverKind = "books" | "kits";

type CoverImageProps = {
  kind: CoverKind;
  slug: string;
  title: string;
  src?: string;
};

const FALLBACK_COVER = "/images/placeholder-cover.svg";

function buildCandidates(kind: CoverKind, slug: string, src?: string): string[] {
  const candidates = [
    src,
    `/covers/${kind}/${slug}.png`,
    `/covers/${kind}/${slug}.jpg`,
    `/covers/${kind}/${slug}.jpeg`,
    `/covers/${slug}.png`,
    `/covers/${slug}.jpg`,
    `/covers/${slug}.jpeg`,
    `/images/${kind}/${slug}.png`,
    `/images/${kind}/${slug}.jpg`,
    `/images/${kind}/${slug}.jpeg`,
    `/images/${slug}.png`,
    `/images/${slug}.jpg`,
    `/images/${slug}.jpeg`,
    FALLBACK_COVER,
  ].filter(Boolean) as string[];

  return Array.from(new Set(candidates));
}

export default function CoverImage({ kind, slug, title, src }: CoverImageProps) {
  const candidates = useMemo(() => buildCandidates(kind, slug, src), [kind, slug, src]);
  const [index, setIndex] = useState(0);
  const activeSrc = candidates[Math.min(index, candidates.length - 1)] || FALLBACK_COVER;

  return (
    <div className="cover-container">
      <img
        src={activeSrc}
        alt={title}
        className="h-full w-full object-contain"
        loading="lazy"
        onError={() => {
          setIndex((current) => (current < candidates.length - 1 ? current + 1 : current));
        }}
      />
    </div>
  );
}
