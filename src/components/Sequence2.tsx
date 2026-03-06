"use client";

import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export interface Sequence2Props {
    frames: string[];
    clampToContainer?: boolean;
    endFrame?: number;
    maxFrames?: number;
    objectPositionX?: number; // 0 to 1
    objectPositionY?: number; // 0 to 1
    className?: string; // used for container styles
    style?: React.CSSProperties; // used for container styles
    children?: React.ReactNode;
}

export default function Sequence2({
    frames,
    clampToContainer = true,
    endFrame,
    maxFrames,
    objectPositionX = 0.5,
    objectPositionY = 0.5,
    className = "",
    style = {},
    children
}: Sequence2Props) {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [progress, setProgress] = useState(0);

    const actualFrames = maxFrames ? frames.slice(0, maxFrames) : (endFrame ? frames.slice(0, endFrame) : frames);
    const TOTAL_FRAMES = actualFrames.length;

    const { scrollYProgress } = useScroll({
        target: containerRef,
        // "start end" = top of target hits bottom of viewport (0%)
        // "end start" = bottom of target hits top of viewport (100%)
        // Actually, typical outro mapping: start animating when it enters, finish when it leaves?
        // Let's stick strictly to "start end" (enters screen) to "end end" (its bottom hits bottom of screen) 
        // which means it perfectly reaches its last frame as it fully fills the screen height.
        offset: clampToContainer ? ["start end", "end end"] : ["start start", "end end"],
    });

    const currentIndex = useTransform(scrollYProgress, [0, 1], [0, Math.max(0, TOTAL_FRAMES - 1)]);

    useEffect(() => {
        if (TOTAL_FRAMES === 0) return;

        let isCancelled = false;

        const loadImages = async () => {
            let loadedCount = 0;

            const promises = actualFrames.map((src) => {
                return new Promise<HTMLImageElement>((resolve) => {
                    const img = new Image();
                    img.src = src;

                    img.onload = () => {
                        loadedCount++;
                        if (!isCancelled) setProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
                        resolve(img);
                    };
                    img.onerror = () => {
                        console.error(`Failed to load ${img.src}`);
                        resolve(img);
                    };
                });
            });

            const loadedImages = await Promise.all(promises);
            if (!isCancelled) {
                setImages(loadedImages);
                setImagesLoaded(true);

                if (loadedImages.length > 0 && canvasRef.current) {
                    drawFrame(loadedImages[0]);
                }
            }
        };

        loadImages();

        return () => { isCancelled = true; }
    }, [actualFrames.join(",")]);

    const drawFrame = (image: HTMLImageElement) => {
        const canvas = canvasRef.current;
        if (!canvas || !image.complete || image.naturalWidth === 0) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();

        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);

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
        <section ref={containerRef} className={`relative ${className}`} style={style}>
            <div className={clampToContainer ? "absolute inset-0 w-full h-full overflow-hidden" : "sticky top-0 w-full h-[100svh] overflow-hidden"}>
                <canvas
                    ref={canvasRef}
                    style={{ objectPosition: `${objectPositionX * 100}% ${objectPositionY * 100}%` }}
                    className="absolute inset-0 w-full h-full object-cover"
                />

                {children}

                {!imagesLoaded && TOTAL_FRAMES > 0 && (
                    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#121212]/80">
                        <div className="w-48 h-1 bg-zinc-800 rounded-full overflow-hidden mb-4">
                            <div
                                className="h-full bg-zinc-200 transition-all duration-300 ease-out"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
