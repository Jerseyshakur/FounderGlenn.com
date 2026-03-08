import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FunnelPageTemplate } from "@/components/funnel";
import { getFunnelConfig } from "@/content/funnels";

export const metadata: Metadata = {
  title: "Nexus HealthKit",
  description: "Nexus HealthKit by Founder Glenn: a premium physiological engine for recovery, readiness, and performance.",
  alternates: {
    canonical: "/nexus",
  },
};

export default function NexusPage() {
  const config = getFunnelConfig("nexus");
  if (!config) notFound();
  return <FunnelPageTemplate config={config} />;
}
