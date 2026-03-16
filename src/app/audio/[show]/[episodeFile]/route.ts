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

async function isReachable(url: string): Promise<boolean> {
  try {
    const head = await fetch(url, { method: "HEAD", redirect: "manual", cache: "no-store" });
    if (head.status === 200 || head.status === 206) return true;
  } catch {}

  try {
    const ranged = await fetch(url, {
      method: "GET",
      headers: { Range: "bytes=0-1" },
      redirect: "manual",
      cache: "no-store",
    });
    return ranged.status === 200 || ranged.status === 206;
  } catch {
    return false;
  }
}

export async function GET(
  _: Request,
  context: { params: { show: string; episodeFile: string } },
) {
  const { show, episodeFile } = context.params;
  if (!isShowSlug(show)) {
    return new Response("Not found", { status: 404 });
  }

  const episodeId = episodeFile.replace(/\.[^.]+$/, "");
  const episode = getPodcastEpisodeById(show, episodeId);
  if (!episode) {
    return new Response("Not found", { status: 404 });
  }

  const keyCandidates = buildCandidateKeys(episode.audioKey);
  for (const base of PUBLIC_AUDIO_BASES) {
    for (const key of keyCandidates) {
      const directUrl = buildDirectAudioUrl(base, key);
      if (await isReachable(directUrl)) {
        return Response.redirect(directUrl, 307);
      }
    }
  }

  return new Response("Audio unavailable", { status: 404 });
}
