"use client";

import { useScroll, useTransform, useMotionValueEvent, motion, MotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const START_FRAME = 23;
const END_FRAME = 158;
const TOTAL_FRAMES = END_FRAME - START_FRAME + 1;
const FRAME_URLS = Array.from(
    { length: TOTAL_FRAMES },
    (_, i) => `/sequence/frame_${(START_FRAME + i).toString().padStart(3, "0")}_delay-0.2s.webp`,
);

function Overlay({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
    // Config values for timing
    const offsetAfterBridging = 0.02;
    const overlayDuration = 0.08;
    const lineStagger = 0.08; // We can use this to hold the last line longer

    // Base timeline
    // Section 1 (0 to 0.2): "Founder Glenn / Author • Physicist"
    const opacity1 = useTransform(scrollProgress, [0, 0.1, 0.2], [1, 1, 0]);
    const y1 = useTransform(scrollProgress, [0, 0.2], [0, -50]);

    // Section 2 (0.2 to 0.5): "I build systems for creators."
    const opacity2 = useTransform(scrollProgress, [0.2, 0.3, 0.4, 0.5], [0, 1, 1, 0]);
    const y2 = useTransform(scrollProgress, [0.2, 0.5], [50, -50]);

    // Section 3 (0.5 to 0.7): "Systems that turn ideas into infrastructure."
    // (We shortened Section 3 and 4 slightly compared to the old 0.8 end to fit 4 sections)
    const opacity3 = useTransform(scrollProgress, [0.45, 0.55, 0.65, 0.75], [0, 1, 1, 0]);
    const y3 = useTransform(scrollProgress, [0.45, 0.75], [50, -50]);

    // Section 4 (0.7 to 0.85): "Infrastructure that outlives the moment."
    const bridgingEnd = 0.85;
    const opacity4 = useTransform(scrollProgress, [0.7, 0.8, bridgingEnd, 0.9], [0, 1, 1, 0]);
    const y4 = useTransform(scrollProgress, [0.7, 0.9], [50, -50]);

    // INTERTITLE Overlay (appears shortly after sequence turns black)
    const intertitleStart = bridgingEnd + offsetAfterBridging; // e.g. 0.87
    const intertitlePeak = intertitleStart + (overlayDuration / 2);
    const intertitleEnd = intertitleStart + overlayDuration; // base duration for most
    const intertitleExtendedEnd = intertitleEnd + lineStagger; // extended hold for last line

    const opacityInterMain = useTransform(
        scrollProgress,
        [intertitleStart, intertitlePeak, intertitleEnd, intertitleEnd + 0.02],
        [0, 1, 1, 0]
    );
    const yInterMain = useTransform(scrollProgress, [intertitleStart, intertitleEnd], [20, -20]);

    // The final line holds slightly longer on screen
    const opacityInterEnd = useTransform(
        scrollProgress,
        [intertitleStart + 0.02, intertitlePeak + 0.02, intertitleExtendedEnd, intertitleExtendedEnd + 0.02],
        [0, 1, 1, 0]
    );

    return (
        <div className="absolute inset-0 z-10 pointer-events-none">
            <div className="relative w-full h-full max-w-7xl mx-auto px-6 lg:px-12">
                {/* --- HERO COPY --- */}

                {/* Section 1 */}
                <motion.div
                    style={{ opacity: opacity1, y: y1 }}
                    className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex flex-col items-center text-center"
                >
                    <h1 className="text-4xl md:text-7xl font-bold tracking-tight text-white mb-4 drop-shadow-md">
                        Founder Glenn
                    </h1>
                    <p className="text-xl md:text-2xl text-zinc-400 font-medium tracking-wide drop-shadow-md">
                        Author &bull; Physicist
                    </p>
                </motion.div>

                {/* Section 2 */}
                <motion.div
                    style={{ opacity: opacity2, y: y2 }}
                    className="absolute left-6 lg:left-12 top-1/2 -translate-y-1/2 max-w-lg"
                >
                    <h2 className="text-4xl md:text-6xl font-semibold leading-tight text-white drop-shadow-md">
                        I build systems for <span className="text-zinc-400">creators.</span>
                    </h2>
                </motion.div>

                {/* Section 3 */}
                <motion.div
                    style={{ opacity: opacity3, y: y3 }}
                    className="absolute right-6 lg:right-12 top-1/2 -translate-y-1/2 max-w-lg text-right"
                >
                    <h2 className="text-4xl md:text-6xl font-semibold leading-tight text-white drop-shadow-md">
                        Systems that turn <span className="text-zinc-400">ideas</span> into infrastructure.
                    </h2>
                </motion.div>

                {/* Section 4 */}
                <motion.div
                    style={{ opacity: opacity4, y: y4 }}
                    className="absolute left-6 lg:left-12 top-1/2 -translate-y-1/2 max-w-lg"
                >
                    <h2 className="text-4xl md:text-6xl font-semibold leading-tight text-white drop-shadow-md">
                        Infrastructure that <span className="text-zinc-400">outlives</span> the moment.
                    </h2>
                </motion.div>

                {/* --- SCROLL INTERTITLE --- */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                    <motion.div
                        style={{ opacity: opacityInterMain, y: yInterMain }}
                        className="space-y-6 md:space-y-8"
                    >
                        <div>
                            <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tight drop-shadow-lg">Founder Glenn</h3>
                            <p className="text-lg md:text-xl text-zinc-400 font-medium mt-2 drop-shadow-md">Author &bull; Physicist</p>
                        </div>

                        <div className="space-y-2 text-xl md:text-3xl font-medium text-white/90 drop-shadow-md">
                            <p>I build systems for creators.</p>
                            <p className="text-white/80">Systems that turn ideas into infrastructure.</p>
                            <p className="text-white/70">Infrastructure that outlives the moment.</p>
                        </div>
                    </motion.div>

                    <motion.div
                        style={{ opacity: opacityInterEnd, y: yInterMain }}
                        className="mt-12 text-2xl md:text-4xl font-semibold text-white drop-shadow-lg max-w-3xl"
                    >
                        <p>We honor the people who came before us by surpassing them.</p>
                    </motion.div>
                </div>

            </div>
        </div>
    );
}

export default function ScrollyCanvas() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imagesRef = useRef<(HTMLImageElement | null)[]>(Array(TOTAL_FRAMES).fill(null));
    const imagePromisesRef = useRef<(Promise<HTMLImageElement> | null)[]>(Array(TOTAL_FRAMES).fill(null));
    const [isPrimed, setIsPrimed] = useState(false);
    const [allFramesLoaded, setAllFramesLoaded] = useState(false);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
    const [progress, setProgress] = useState(0);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Map 0-1 to frame indices (leaving some padding at the end for pure layout)
    const currentIndex = useTransform(scrollYProgress, [0, 0.8], [0, TOTAL_FRAMES - 1]);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        const updateMotionPreference = () => setPrefersReducedMotion(mediaQuery.matches);
        updateMotionPreference();

        mediaQuery.addEventListener("change", updateMotionPreference);
        return () => mediaQuery.removeEventListener("change", updateMotionPreference);
    }, []);

    const drawFrame = (image: HTMLImageElement) => {
        const canvas = canvasRef.current;
        if (!canvas || !image.complete || image.naturalWidth === 0) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Handle high DPI displays
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();

        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);

        // Adjustable offset that maps to object-position behavior
        // 0.5 = center, 0.2 = 20% from top (to frame the face correctly)
        const objectPositionX = 0.5;
        const objectPositionY = 0.2;

        // Object cover logic
        const canvasRatio = rect.width / rect.height;
        const imageRatio = image.width / image.height;

        let renderWidth = rect.width;
        let renderHeight = rect.height;
        let offsetX = 0;
        let offsetY = 0;

        if (canvasRatio > imageRatio) {
            renderWidth = rect.width;
            renderHeight = rect.width / imageRatio;
            offsetY = (rect.height - renderHeight) * objectPositionY;
        } else {
            renderHeight = rect.height;
            renderWidth = rect.height * imageRatio;
            offsetX = (rect.width - renderWidth) * objectPositionX;
        }

        ctx.clearRect(0, 0, rect.width, rect.height);
        ctx.drawImage(image, offsetX, offsetY, renderWidth, renderHeight);
    };

    useEffect(() => {
        if (prefersReducedMotion) {
            setIsPrimed(true);
            return;
        }

        let cancelled = false;
        let loadedCount = 0;

        const loadFrameAtIndex = (index: number): Promise<HTMLImageElement> => {
            const cached = imagesRef.current[index];
            if (cached) return Promise.resolve(cached);

            const pending = imagePromisesRef.current[index];
            if (pending) return pending;

            const promise = new Promise<HTMLImageElement>((resolve) => {
                const img = new Image();
                img.src = FRAME_URLS[index];

                img.onload = () => {
                    imagesRef.current[index] = img;
                    loadedCount += 1;
                    if (!cancelled) {
                        setProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
                    }
                    resolve(img);
                };

                img.onerror = () => {
                    // Keep sequence resilient; fall back to nearest loaded frame.
                    loadedCount += 1;
                    if (!cancelled) {
                        setProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
                    }
                    resolve(img);
                };
            });

            imagePromisesRef.current[index] = promise;
            return promise;
        };

        const buildInitialFrameIndices = (): number[] => {
            const isMobileLike =
                window.innerWidth < 768 || window.matchMedia("(pointer: coarse)").matches;
            const initialFrameBudget = isMobileLike ? 12 : 20;
            const step = Math.max(1, Math.floor((TOTAL_FRAMES - 1) / (initialFrameBudget - 1)));
            const indices = new Set<number>([0]);

            for (let i = step; i < TOTAL_FRAMES; i += step) {
                indices.add(i);
                if (indices.size >= initialFrameBudget) break;
            }
            indices.add(TOTAL_FRAMES - 1);

            return Array.from(indices).sort((a, b) => a - b);
        };

        const loadProgressively = async () => {
            const initialIndices = buildInitialFrameIndices();
            const remainingIndices = Array.from({ length: TOTAL_FRAMES }, (_, i) => i).filter(
                (index) => !initialIndices.includes(index),
            );

            // Make the hero usable as soon as the first frame arrives.
            await loadFrameAtIndex(0);
            if (cancelled) return;

            const firstFrame = imagesRef.current[0];
            if (firstFrame && canvasRef.current) {
                drawFrame(firstFrame);
            }
            setIsPrimed(true);

            // Fill a small initial subset before broad background loading.
            const initialRemainder = initialIndices.filter((index) => index !== 0);
            await Promise.all(initialRemainder.map((index) => loadFrameAtIndex(index)));
            if (cancelled) return;

            // Continue loading all remaining frames in the background.
            Promise.all(remainingIndices.map((index) => loadFrameAtIndex(index))).then(() => {
                if (!cancelled) {
                    setAllFramesLoaded(true);
                }
            });
        };

        loadProgressively();

        return () => {
            cancelled = true;
        };
    }, [prefersReducedMotion]);

    const getNearestLoadedFrame = (target: number): HTMLImageElement | null => {
        const direct = imagesRef.current[target];
        if (direct) return direct;

        for (let offset = 1; offset < TOTAL_FRAMES; offset += 1) {
            const left = target - offset;
            const right = target + offset;
            if (left >= 0 && imagesRef.current[left]) return imagesRef.current[left];
            if (right < TOTAL_FRAMES && imagesRef.current[right]) return imagesRef.current[right];
        }

        return null;
    };

    useMotionValueEvent(currentIndex, "change", (latest) => {
        if (!isPrimed || prefersReducedMotion) return;

        const frameIndex = Math.min(Math.max(Math.floor(latest), 0), TOTAL_FRAMES - 1);
        const frame = getNearestLoadedFrame(frameIndex);
        if (frame) drawFrame(frame);
    });

    useEffect(() => {
        if (prefersReducedMotion) return;

        const handleResize = () => {
            if (!isPrimed) return;
            const frameIndex = Math.min(Math.max(Math.floor(currentIndex.get()), 0), TOTAL_FRAMES - 1);
            const frame = getNearestLoadedFrame(frameIndex);
            if (frame) drawFrame(frame);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [isPrimed, prefersReducedMotion, currentIndex]);

    return (
        <section ref={containerRef} className={`relative w-full bg-[#121212] ${prefersReducedMotion ? "h-[100svh]" : "h-[500vh]"}`}>
            <div className="sticky top-0 w-full h-[100svh] overflow-hidden bg-[#121212]">
                {prefersReducedMotion ? (
                    <>
                        <img
                            src={FRAME_URLS[0]}
                            alt="Founder Glenn hero frame"
                            className="absolute inset-0 h-full w-full object-cover object-[50%_20%] opacity-60"
                        />
                        <div className="absolute inset-0 z-10 pointer-events-none">
                            <div className="relative w-full h-full max-w-7xl mx-auto px-6 lg:px-12">
                                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex flex-col items-center text-center">
                                    <h1 className="text-4xl md:text-7xl font-bold tracking-tight text-white mb-4 drop-shadow-md">
                                        Founder Glenn
                                    </h1>
                                    <p className="text-xl md:text-2xl text-zinc-400 font-medium tracking-wide drop-shadow-md">
                                        Author &bull; Physicist
                                    </p>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <canvas
                            ref={canvasRef}
                            style={{ objectPosition: "center 20%" }}
                            className="absolute inset-0 w-full h-full object-cover opacity-60"
                        />

                        {/* The Text Overlay */}
                        {isPrimed && <Overlay scrollProgress={scrollYProgress} />}

                        {/* Loader */}
                        {!isPrimed && (
                            <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#121212]">
                                <div className="w-48 h-1 bg-zinc-800 rounded-full overflow-hidden mb-4">
                                    <div
                                        className="h-full bg-zinc-200 transition-all duration-300 ease-out"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                                <p className="text-zinc-500 text-xs tracking-[0.2em] uppercase font-medium">
                                    Loading Sequence... {progress}%
                                </p>
                            </div>
                        )}

                        {!allFramesLoaded && isPrimed ? (
                            <div className="absolute bottom-6 right-6 text-[10px] uppercase tracking-[0.14em] text-zinc-500">
                                Refining Frames...
                            </div>
                        ) : null}
                    </>
                )}
            </div>
        </section>
    );
}
