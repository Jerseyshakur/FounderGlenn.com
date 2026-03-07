"use client";

import { useMemo, useState } from "react";

type CoverKind = "books" | "kits" | "essays";

type CoverImageProps = {
  kind: CoverKind;
  slug: string;
  title: string;
  src?: string;
  alt?: string;
};

const FALLBACK_COVERS: Record<CoverKind, string> = {
  books: "/images/placeholder-cover.svg",
  kits: "/images/placeholder-cover.svg",
  essays: "/images/placeholder-essay-cover.svg",
};

function buildCandidates(kind: CoverKind, slug: string, src?: string): string[] {
  const explicitSourceCandidates = src
    ? /\.[a-z0-9]+($|\?)/i.test(src)
      ? [src]
      : [src, `${src}.png`, `${src}.jpg`, `${src}.jpeg`]
    : [];

  const candidates = [
    ...explicitSourceCandidates,
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
    FALLBACK_COVERS[kind],
  ].filter(Boolean) as string[];

  return Array.from(new Set(candidates));
}

export default function CoverImage({ kind, slug, title, src, alt }: CoverImageProps) {
  const candidates = useMemo(() => buildCandidates(kind, slug, src), [kind, slug, src]);
  const [index, setIndex] = useState(0);
  const activeSrc = candidates[Math.min(index, candidates.length - 1)] || FALLBACK_COVERS[kind];

  return (
    <div className="cover-container">
      <img
        src={activeSrc}
        alt={alt || title}
        className="h-full w-full object-contain"
        loading="lazy"
        onError={() => {
          setIndex((current) => (current < candidates.length - 1 ? current + 1 : current));
        }}
      />
    </div>
  );
}
