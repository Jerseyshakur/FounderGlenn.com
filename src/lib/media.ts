import { seoConfig } from "@/lib/seo";

const DEFAULT_MEDIA_BASE_URL = "https://media.founderglenn.com";

export function buildSiteUrl(path: string = ""): string {
  const base = process.env.SITE_URL || seoConfig.siteUrl;
  const normalizedBase = base.replace(/\/+$/, "");
  const normalizedPath = path.replace(/^\/+/, "");
  return normalizedPath ? `${normalizedBase}/${normalizedPath}` : normalizedBase;
}

export function buildAudioUrl(audioKey: string): string {
  const base = process.env.R2_PUBLIC_BASE_URL || DEFAULT_MEDIA_BASE_URL;
  const normalizedBase = base.replace(/\/+$/, "");
  const normalizedKey = audioKey.replace(/^\/+/, "");
  const encodedKey = normalizedKey
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");
  return `${normalizedBase}/${encodedKey}`;
}
