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

export function inferAudioExtension(audioKey: string, mimeType?: string): string {
  const lowerKey = audioKey.toLowerCase();
  const lowerMime = (mimeType || "").toLowerCase();

  if (lowerKey.endsWith(".m4a") || lowerKey.endsWith(".mp4") || lowerMime.includes("audio/mp4")) {
    return ".m4a";
  }
  if (lowerKey.endsWith(".aac") || lowerMime.includes("audio/aac")) {
    return ".aac";
  }
  if (lowerKey.endsWith(".wav") || lowerMime.includes("audio/wav")) {
    return ".wav";
  }
  return ".mp3";
}

/** When `audioBytes` changes, the query changes so CDNs and podcast apps fetch the new file instead of a stale cached response at the same path. */
export function buildAudioProxyUrl(
  showSlug: string,
  episodeId: string,
  audioKey: string,
  mimeType?: string,
  audioBytes?: number,
): string {
  const ext = inferAudioExtension(audioKey, mimeType);
  const url = buildSiteUrl(`/audio/${showSlug}/${episodeId}${ext}`);
  if (typeof audioBytes === "number" && audioBytes > 0) {
    return `${url}?v=${audioBytes}`;
  }
  return url;
}
