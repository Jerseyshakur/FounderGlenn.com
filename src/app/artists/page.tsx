/**
 * /artists — Artist Funnel Landing Page
 *
 * The primary acquisition funnel for independent creators.
 * Connects ideology (ownership) → education (Sign Here) → tools (Kits) → infrastructure (Splits).
 *
 * Built as a bespoke page rather than FunnelPageTemplate to support:
 * - cinematic stagger reveals (Framer Motion)
 * - editorial rhythm with intentional whitespace
 * - multi-section progression matching the artist's psychological journey
 *
 * Visual system: inherits from the global design system (#121212 bg, zinc hierarchy,
 * border-white/10 cards, rounded-full pills, Geist font) — no new tokens introduced.
 */

import type { Metadata } from "next";
import Link from "next/link";
import ArtistFunnelPage from "./ArtistFunnelPage";

export const metadata: Metadata = {
  title: "Artist Infrastructure",
  description:
    "The creator operating system. Legal infrastructure, royalty recovery, and the systems independent artists actually need to own their work.",
  alternates: {
    canonical: "https://founderglenn.com/artists",
  },
};

export default function ArtistsPage() {
  return <ArtistFunnelPage />;
}
