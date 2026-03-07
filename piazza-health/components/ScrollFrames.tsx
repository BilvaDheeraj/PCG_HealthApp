"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function ScrollFrames() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [loaded, setLoaded] = useState(false);

    // There are 40 frames in total
    const frameCount = 40;

    useEffect(() => {
        // Preload all frames
        const loadedImages: HTMLImageElement[] = [];
        let loadedCount = 0;

        for (let i = 1; i <= frameCount; i++) {
            const img = new window.Image();
            // Format number to 3 digits, e.g., 001, 002...
            const frameNumber = i.toString().padStart(3, "0");
            img.src = `/imgframes/ezgif-frame-${frameNumber}.jpg`;
            img.onload = () => {
                loadedCount++;
                if (loadedCount === frameCount) {
                    setImages(loadedImages);
                    setLoaded(true);
                }
            };
            loadedImages.push(img);
        }
    }, [frameCount]);

    useEffect(() => {
        if (!loaded || images.length === 0 || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Configuration
        // Define scrollRange dynamically (end frames right before HowItWorks section)
        // Which spans Hero + MedicalBoard + Dashboard + Stats (approx 4.2 * window.innerHeight)
        const getScrollRange = () => window.innerHeight * 4.2;

        // Initial Draw
        const drawImage = (img: HTMLImageElement) => {
            const windowRatio = window.innerWidth / window.innerHeight;
            const imgRatio = img.width / img.height;

            let drawWidth = canvas.width;
            let drawHeight = canvas.height;
            let offsetX = 0;
            let offsetY = 0;

            if (windowRatio > imgRatio) {
                drawHeight = canvas.width / imgRatio;
                offsetY = (canvas.height - drawHeight) / 2;
            } else {
                drawWidth = canvas.height * imgRatio;
                offsetX = (canvas.width - drawWidth) / 2;
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        };

        const updateCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            // Redraw current frame
            const scrollFraction = Math.min(Math.max(window.scrollY / getScrollRange(), 0), 1);
            const frameIndex = Math.min(
                frameCount - 1,
                Math.floor(scrollFraction * frameCount)
            );
            drawImage(images[frameIndex]);
        };

        const handleScroll = () => {
            // How far down the page have we scrolled as a fraction of our intended range?
            const scrollFraction = Math.min(Math.max(window.scrollY / getScrollRange(), 0), 1);

            // Calculate which frame corresponds to that fraction
            const frameIndex = Math.min(
                frameCount - 1,
                Math.floor(scrollFraction * frameCount)
            );

            requestAnimationFrame(() => {
                drawImage(images[frameIndex]);
            });
        };

        window.addEventListener("resize", updateCanvasSize);
        window.addEventListener("scroll", handleScroll, { passive: true });

        // Initial setup
        updateCanvasSize();

        return () => {
            window.removeEventListener("resize", updateCanvasSize);
            window.removeEventListener("scroll", handleScroll);
        };
    }, [loaded, images]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                zIndex: 0,
                pointerEvents: "none",
                opacity: loaded ? 0.35 : 0, // Lower opacity so text is readable
                transition: "opacity 1s ease-in-out",
                filter: "brightness(0.8) contrast(1.2)"
            }}
        />
    );
}
