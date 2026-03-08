import type { FunnelPageConfig } from "@/components/funnel";

export const FUNNEL_CONFIGS: Record<string, FunnelPageConfig> = {
  legal: {
    slug: "legal",
    hero: {
      eyebrow: "Indie Artist Legal",
      title: "Protect Your Music Before Anyone Steals Your Rights",
      subtitle:
        "The music industry runs on paperwork. If you do not understand the paperwork, you do not control the music.",
      media: {
        src: "/indie-artist-legal-kit.png",
        alt: "Sign Here: The Indie Artist Legal Kit cover",
        caption: "Sign Here: The Indie Artist Legal Kit",
      },
      primaryAction: { type: "link", label: "Get the Indie Artist Legal Kit", href: "/kits/indie-artist-legal-kit" },
      secondaryAction: { type: "link", label: "See Legal Resources", href: "/kits" },
      proofPoints: [
        "Built for independent artists",
        "Designed for real deal pressure",
        "Clear legal language without noise",
      ],
    },
    problem: {
      eyebrow: "The Risk",
      title: "Most independent artists lose ownership in the paperwork stage",
      description:
        "The legal side of music is rarely explained before signatures happen, and that is where leverage gets lost.",
      points: [
        "Verbal agreements become disputes once money appears.",
        "Split, producer, and distribution terms are signed without context.",
        "Unclear ownership language can transfer rights permanently.",
        "Artists discover legal mistakes only after traction arrives.",
      ],
    },
    offer: {
      eyebrow: "What Is Inside",
      title: "A legal operating system before your next release",
      description: "Everything is focused on protecting ownership, clarifying terms, and reducing avoidable legal risk.",
      items: [
        {
          title: "Contract Templates",
          description: "Artist-first agreements for collaborators, producers, and release workflows.",
        },
        {
          title: "Clause Decoder",
          description: "Plain-English guidance on high-risk clauses and negotiation pressure points.",
        },
        {
          title: "Release Readiness Workflow",
          description: "A practical checklist for rights, splits, credits, and legal handoff before launch.",
        },
      ],
    },
    offerStack: {
      eyebrow: "Offer Stack",
      title: "What you get in the Indie Artist Legal Kit",
      subtitle: "Focused, tactical, and built to execute quickly.",
      items: [
        { label: "Core legal templates", detail: "Artist-first structure" },
        { label: "Contract language translation", detail: "Plain English, no legal theater" },
        { label: "Risk review checklist", detail: "Pre-release ownership protection" },
        { label: "Execution framework", detail: "Use before producer, label, or distributor deals" },
      ],
    },
    authority: {
      eyebrow: "Why Founder Glenn",
      title: "Founder-led systems for creator ownership",
      body:
        "Founder Glenn builds infrastructure for creators who want durable leverage. This kit is designed to remove ambiguity before artists enter label, distributor, or collaborator conversations.",
      trustPoints: [
        "System-first creator strategy",
        "Practical and implementation-ready",
        "Aligned with long-term ownership and control",
      ],
    },
    cta: {
      eyebrow: "Start Here",
      title: "Protect your rights before your next signature",
      body: "This is the strongest entry point for artists who want control before momentum.",
      primaryAction: { type: "link", label: "Get the Indie Artist Legal Kit", href: "/kits/indie-artist-legal-kit" },
      secondaryAction: { type: "link", label: "Preview the Kit Library", href: "/kits" },
    },
    upsells: {
      eyebrow: "Related Kits",
      title: "Continue with targeted next steps",
      items: [
        {
          title: "Royalty Survival Kit",
          description: "Find and claim revenue paths artists frequently miss.",
          action: { type: "link", label: "Explore", href: "/royalties" },
        },
        {
          title: "Fan Funnel Kit",
          description: "Turn casual listeners into direct audience relationships.",
          action: { type: "link", label: "Explore", href: "/kits/fan-funnel-kit" },
        },
        {
          title: "Sign Here: The Blueprint Decoded",
          description: "Decode deal structures before signing under pressure.",
          action: { type: "link", label: "Explore", href: "/books/sign-here-the-blueprint-decoded-founder-edition" },
        },
      ],
    },
    leadCapture: {
      eyebrow: "Free Guide",
      title: "5 Contracts Every Artist Needs Before Releasing Music",
      body: "A concise lead magnet for artists not ready to purchase yet.",
      ctaLabel: "Send Me the Checklist",
      integrationNote:
        "Integration placeholder: wire `formActionUrl` to your email provider endpoint when available.",
    },
  },
  royalties: {
    slug: "royalties",
    hero: {
      eyebrow: "Royalty Systems",
      title: "Find Every Dollar Your Music Earns",
      subtitle:
        "Artists leave thousands in royalties unclaimed. Most miss revenue from streaming, publishing, YouTube, SoundExchange, the MLC, and PRO systems.",
      primaryAction: { type: "link", label: "Get the Royalty Survival Kit", href: "/kits/seven-steps-to-find-every-dollar" },
      secondaryAction: { type: "link", label: "Browse Royalty Resources", href: "/kits" },
      proofPoints: [
        "Built for artists with active releases",
        "Practical revenue recovery workflows",
        "High-trust, system-first execution",
      ],
    },
    problem: {
      eyebrow: "Royalty Pain Points",
      title: "Money is lost when collection systems are fragmented",
      description:
        "Most misses are not talent issues. They are workflow issues between metadata, registrations, and follow-through.",
      points: [
        "Catalog metadata is incomplete, inconsistent, or never reconciled.",
        "Publishing, neighboring rights, and platform claims live in separate systems.",
        "Artists release quickly but delay registration and payment verification.",
        "No recurring audit routine means money leaks for months or years.",
      ],
    },
    offer: {
      eyebrow: "Solution / System Breakdown",
      title: "A royalty operating system you can execute consistently",
      description: "This funnel is built to move from uncertainty to measurable recovery and claim cadence.",
      items: [
        {
          title: "Revenue Map Framework",
          description: "Understand each royalty lane and where your money should actually show up.",
        },
        {
          title: "Registration and Claim Workflow",
          description: "Step-by-step processes for setup, claim submission, and follow-through.",
        },
        {
          title: "Verification Cadence",
          description: "A recurring review routine to identify misses and close payout gaps.",
        },
      ],
    },
    transformation: {
      eyebrow: "Before and After",
      title: "From reactive tracking to repeatable royalty recovery",
      beforeLabel: "Before",
      afterLabel: "After",
      beforePoints: [
        "Money arrives unpredictably",
        "No source-of-truth for registrations",
        "Claims are submitted inconsistently",
      ],
      afterPoints: [
        "Clear map across streaming, publishing, and performance channels",
        "Routine claim and follow-up process",
        "Predictable visibility into missing vs. collected revenue",
      ],
    },
    offerStack: {
      eyebrow: "Offer Stack",
      title: "What you get in the Royalty Survival Kit",
      subtitle: "Focused support for recovery, claims, and control.",
      items: [
        { label: "Royalty lane map", detail: "Streaming, publishing, YouTube, PRO, MLC, SoundExchange" },
        { label: "Claim execution steps", detail: "From setup to payout follow-up" },
        { label: "Audit checklist", detail: "Catch missed revenue systematically" },
        { label: "Operator cadence", detail: "Maintain control as catalog grows" },
      ],
    },
    cta: {
      eyebrow: "Primary CTA",
      title: "Recover what your catalog already earned",
      body: "Start with the Royalty Survival Kit and apply the framework this week.",
      primaryAction: { type: "link", label: "Get the Royalty Survival Kit", href: "/kits/seven-steps-to-find-every-dollar" },
      secondaryAction: { type: "link", label: "View All Kits", href: "/kits" },
    },
    upsells: {
      eyebrow: "Supporting Products",
      title: "Priority royalty resources",
      items: [
        {
          title: "7 Steps to Find Every Dollar",
          description: "Practical walkthrough to discover hidden royalty paths.",
          action: { type: "link", label: "View", href: "/kits/seven-steps-to-find-every-dollar" },
        },
        {
          title: "7 Steps to Claim Every Royalty",
          description: "Execution checklist for claiming and verification.",
          action: { type: "link", label: "View", href: "/kits/seven-steps-to-claim-every-royalty" },
        },
        {
          title: "Artist Legal Glossary",
          description: "Contract and legal terms that directly affect royalties.",
          action: { type: "link", label: "View", href: "/kits/artist-legal-glossary" },
        },
      ],
    },
  },
  nexus: {
    slug: "nexus",
    hero: {
      eyebrow: "Nexus HealthKit",
      title: "Your Body Is Running a System. Nexus Shows You the Code.",
      subtitle:
        "Most health apps just show data. Nexus interprets recovery, readiness, and physiological patterns so people can train, work, and recover with precision.",
      primaryAction: { type: "link", label: "Join TestFlight", href: "https://testflight.apple.com/join/j1tpp54U", external: true },
      secondaryAction: { type: "link", label: "View on App Store", href: "https://apps.apple.com/", external: true },
      proofPoints: ["Premium performance intelligence", "Founder-led product evolution", "Health and work readiness focus"],
    },
    problem: {
      eyebrow: "The Problem",
      title: "Most health apps show metrics but not meaning",
      description:
        "Data alone does not help if you still cannot decide how hard to train, when to recover, or when to push cognitively.",
      points: [
        "Dashboards report numbers without decision context.",
        "Readiness and recovery signals are scattered across disconnected views.",
        "People overtrain or overwork because trends are not interpreted in real time.",
        "High performers need signal clarity, not another generic tracker.",
      ],
    },
    offer: {
      eyebrow: "Solution: Nexus Engine",
      title: "A physiological engine that translates signal into action",
      description: "Nexus is built to connect what your body is saying with what your schedule demands.",
      items: [
        {
          title: "Readiness Engine",
          description: "Interprets daily readiness for training intensity, deep work, and strategic load.",
        },
        {
          title: "Recovery Intelligence",
          description: "Detects fatigue trends and rebound windows before performance breaks.",
        },
        {
          title: "Pattern Learning Loop",
          description: "Builds context over time so decisions improve with each cycle.",
        },
      ],
    },
    authority: {
      eyebrow: "Founder Story",
      title: "Built while physically run down and still expected to perform",
      body:
        "Nexus came from a period where output looked strong externally while internal capacity was breaking down. The engine was built to reflect reality early, not after burnout. That founder experience drives every product decision.",
      quote: "The engine reflected what I felt before the dashboards did.",
      quoteAttribution: "Founder Glenn",
    },
    offerStack: {
      eyebrow: "Features",
      title: "What powers the Nexus experience",
      subtitle: "A premium stack for health-performance operators.",
      items: [
        { label: "Readiness score architecture", detail: "Train/work intensity guidance" },
        { label: "Recovery pattern detection", detail: "Stress, fatigue, and rebound visibility" },
        { label: "Decision-first interface", detail: "Interpretation over raw chart clutter" },
        { label: "Founder-led iteration cadence", detail: "Built from real operational constraints" },
      ],
    },
    transformation: {
      eyebrow: "Pro Positioning",
      title: "Built for people who need reliable signal under load",
      beforeLabel: "Typical Health Apps",
      afterLabel: "Nexus",
      beforePoints: [
        "Static dashboards and disconnected metrics",
        "Generic insights with weak actionability",
        "Little relevance to demanding work and training schedules",
      ],
      afterPoints: [
        "Interpreted physiological signal with clear next-step context",
        "Readiness and recovery linked to decision quality",
        "A premium system for sustained performance and longevity",
      ],
    },
    cta: {
      eyebrow: "Premium Access",
      title: "Start with Nexus now",
      body: "Join the current release track and experience the Nexus engine directly.",
      primaryAction: { type: "link", label: "Download on TestFlight", href: "https://testflight.apple.com/join/j1tpp54U", external: true },
      secondaryAction: { type: "link", label: "View App Store Listing", href: "https://apps.apple.com/", external: true },
    },
  },
};

export function getFunnelConfig(slug: string): FunnelPageConfig | null {
  return FUNNEL_CONFIGS[slug] ?? null;
}
