"use client";

import { useScroll, useTransform, useMotionValueEvent, motion, MotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const START_FRAME = 23;
const END_FRAME = 158;
const TOTAL_FRAMES = END_FRAME - START_FRAME + 1;

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
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [progress, setProgress] = useState(0);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Map 0-1 to frame indices (leaving some padding at the end for pure layout)
    const currentIndex = useTransform(scrollYProgress, [0, 0.8], [0, TOTAL_FRAMES - 1]);

    useEffect(() => {
        // Preload all frames concurrently
        const loadImages = async () => {
            let loadedCount = 0;

            const promises = Array.from({ length: TOTAL_FRAMES }, (_, i) => {
                return new Promise<HTMLImageElement>((resolve) => {
                    const img = new Image();
                    const num = (START_FRAME + i).toString().padStart(3, "0");
                    img.src = `/sequence/frame_${num}_delay-0.2s.webp`;

                    img.onload = () => {
                        loadedCount++;
                        setProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
                        resolve(img);
                    };
                    img.onerror = () => {
                        console.error(`Failed to load ${img.src}`);
                        resolve(img); // Resolve anyway to keep order
                    };
                });
            });

            const loadedImages = await Promise.all(promises);
            setImages(loadedImages);
            setImagesLoaded(true);

            // Draw first frame immediately
            if (loadedImages.length > 0 && canvasRef.current) {
                drawFrame(loadedImages[0]);
            }
        };

        loadImages();
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

    useMotionValueEvent(currentIndex, "change", (latest) => {
        if (!imagesLoaded || images.length === 0) return;
        // Map the continuous value to a valid array index
        const frameIndex = Math.min(Math.max(Math.floor(latest), 0), images.length - 1);
        drawFrame(images[frameIndex]);
    });

    useEffect(() => {
        const handleResize = () => {
            if (!imagesLoaded || images.length === 0) return;
            const frameIndex = Math.min(Math.max(Math.floor(currentIndex.get()), 0), images.length - 1);
            drawFrame(images[frameIndex]);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [imagesLoaded, images, currentIndex]);

    return (
        <section ref={containerRef} className="relative w-full h-[500vh] bg-[#121212]">
            <div className="sticky top-0 w-full h-[100svh] overflow-hidden bg-[#121212]">
                <canvas
                    ref={canvasRef}
                    style={{ objectPosition: 'center 20%' }}
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                />

                {/* The Text Overlay */}
                {imagesLoaded && <Overlay scrollProgress={scrollYProgress} />}

                {/* Loader */}
                {!imagesLoaded && (
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
            </div>
        </section>
    );
}
