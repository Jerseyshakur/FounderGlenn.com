import { getPodcastEpisodeById, type PodcastShowSlug } from "@/content/podcasts";

const PUBLIC_AUDIO_BASES = [
  process.env.R2_PUBLIC_BASE_URL,
  "https://media.founderglenn.com",
  "https://pub-8a4afe92f68a4feabbd7c83c67a72998.r2.dev",
].filter(Boolean) as string[];

function isShowSlug(value: string): value is PodcastShowSlug {
  return value === "founder-glenn-podcast" || value === "foundation" || value === "codex";
}

function encodeAudioKey(audioKey: string): string {
  return audioKey
    .replace(/^\/+/, "")
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");
}

function buildDirectAudioUrl(base: string, audioKey: string): string {
  return `${base.replace(/\/+$/, "")}/${encodeAudioKey(audioKey)}`;
}

function buildCandidateKeys(audioKey: string): string[] {
  const keys = new Set<string>([audioKey]);
  const normalizedKey = audioKey.replace(/^\/+/, "");
  const lastSlashIndex = normalizedKey.lastIndexOf("/");
  const keyDir = lastSlashIndex >= 0 ? normalizedKey.slice(0, lastSlashIndex + 1) : "";
  const keyFile = lastSlashIndex >= 0 ? normalizedKey.slice(lastSlashIndex + 1) : normalizedKey;
  const hasExtension = /\.[a-z0-9]{2,5}$/i.test(keyFile);

  // Some R2 uploads were added without consistent extensions in metadata. Probe both forms.
  if (!hasExtension && keyFile.length > 0) {
    keys.add(`${keyDir}${keyFile}.mp3`);
    keys.add(`${keyDir}${keyFile}.m4a`);
  }
  if (hasExtension) {
    const withoutExt = keyFile.replace(/\.[a-z0-9]{2,5}$/i, "");
    if (withoutExt.length > 0) {
      keys.add(`${keyDir}${withoutExt}`);
    }
  }

  const nestedSegment = "/founder-glenn-s-the-codex-podcast-episodes/";
  const doubleNestedSegment =
    "/founder-glenn-s-the-codex-podcast-episodes/founder-glenn-s-the-codex-podcast-episodes/";
  const s1Segment = "/S1/";
  if (audioKey.includes(s1Segment) && !audioKey.includes(nestedSegment)) {
    const singleNested = audioKey.replace(
      s1Segment,
      `${s1Segment}founder-glenn-s-the-codex-podcast-episodes/`,
    );
    keys.add(singleNested);
    keys.add(
      audioKey.replace(
        s1Segment,
        `${s1Segment}founder-glenn-s-the-codex-podcast-episodes/founder-glenn-s-the-codex-podcast-episodes/`,
      ),
    );
  }
  if (audioKey.includes(nestedSegment)) {
    keys.add(audioKey.replace(nestedSegment, "/"));
    keys.add(audioKey.replace(nestedSegment, doubleNestedSegment));
  }
  if (audioKey.includes(doubleNestedSegment)) {
    keys.add(audioKey.replace(doubleNestedSegment, nestedSegment));
    keys.add(audioKey.replace(doubleNestedSegment, "/"));
  }

  return Array.from(keys);
}

function passthroughHeaders(source: Headers): Headers {
  const headers = new Headers();
  const allowed = [
    "content-type",
    "content-length",
    "accept-ranges",
    "content-range",
    "etag",
    "last-modified",
    "cache-control",
  ];
  for (const key of allowed) {
    const value = source.get(key);
    if (value) {
      headers.set(key, value);
    }
  }
  // Keep this edge-cached similarly to feed responses.
  if (!headers.has("cache-control")) {
    headers.set("cache-control", "public, s-maxage=1800, stale-while-revalidate=86400");
  }
  return headers;
}

async function resolveAudioResponse(urls: string[], method: "GET" | "HEAD", range?: string | null) {
  for (const url of urls) {
    try {
      const response = await fetch(url, {
        method,
        headers: range && method === "GET" ? { Range: range } : undefined,
        redirect: "follow",
        cache: "no-store",
      });
      if (response.status === 200 || response.status === 206) {
        return response;
      }
    } catch {}
  }
  return null;
}

async function handleAudioRequest(request: Request, context: { params: { show: string; episodeFile: string } }) {
  const { show, episodeFile } = context.params;
  if (!isShowSlug(show)) {
    return new Response("Not found", { status: 404 });
  }

  const episodeId = episodeFile.replace(/\.[^.]+$/, "").split("?")[0];
  const episode = getPodcastEpisodeById(show, episodeId);
  if (!episode) {
    return new Response("Not found", { status: 404 });
  }

  const keyCandidates = buildCandidateKeys(episode.audioKey);
  const urls: string[] = [];
  for (const base of PUBLIC_AUDIO_BASES) {
    for (const key of keyCandidates) {
      urls.push(buildDirectAudioUrl(base, key));
    }
  }

  const method = request.method === "HEAD" ? "HEAD" : "GET";
  const upstream = await resolveAudioResponse(urls, method, request.headers.get("range"));
  if (upstream) {
    return new Response(method === "HEAD" ? null : upstream.body, {
      status: upstream.status,
      headers: passthroughHeaders(upstream.headers),
    });
  }

  return new Response("Audio unavailable", { status: 404 });
}

export async function GET(request: Request, context: { params: { show: string; episodeFile: string } }) {
  return handleAudioRequest(request, context);
}

export async function HEAD(request: Request, context: { params: { show: string; episodeFile: string } }) {
  return handleAudioRequest(request, context);
}
