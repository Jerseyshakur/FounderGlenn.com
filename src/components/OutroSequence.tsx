"use client";

import Sequence2 from "./Sequence2";

interface OutroSequenceProps {
    frames: string[];
    height?: string; // e.g. '50vh', '300px'
    focusY?: number; // 0 to 1
    maxFrames?: number;
}

export default function OutroSequence({
    frames,
    height = "50vh",
    focusY = 0.2,
    maxFrames
}: OutroSequenceProps) {
    return (
        <Sequence2
            frames={frames}
            clampToContainer={true}
            maxFrames={maxFrames}
            objectPositionX={0.5}
            objectPositionY={focusY}
            style={{ height }}
            className="w-full relative pointer-events-none"
        >
            {/* Outro specific overlay or gradients can go here */}
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#121212] to-transparent z-10" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#121212] to-transparent z-10" />
        </Sequence2>
    );
}
