/** Soft warm glow layer for /PharaohGlenn — same depth idea as Nexus BodyOS, different palette. */
export function PharaohGlennAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute -top-32 left-1/3 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-amber-400/18 blur-[96px]" />
      <div className="absolute -right-16 top-[15%] h-[28rem] w-[28rem] rounded-full bg-rose-400/14 blur-[88px]" />
      <div className="absolute -left-24 top-[40%] h-[26rem] w-[26rem] rounded-full bg-sky-400/12 blur-[88px]" />
      <div className="absolute bottom-[20%] right-1/4 h-[24rem] w-[24rem] rounded-full bg-amber-300/10 blur-[100px]" />
      <div className="absolute -bottom-16 left-0 h-[30rem] w-[30rem] rounded-full bg-rose-300/12 blur-[96px]" />
    </div>
  );
}
