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
        const loadedImages: HTMLImageElement[] = [];
        let loadedCount = 0;

        for (let i = 1; i <= frameCount; i++) {
            const img = new window.Image();
            const frameNumber = i.toString().padStart(3, "0");
            img.src = `/imgframes/ezgif-frame-${frameNumber}.jpg`;
            img.onload = () => {
                loadedCount++;
                if (i === 1) setLoaded(true); // Show as soon as first frame is ready
                if (loadedCount === frameCount) {
                    setImages(loadedImages);
                }
            };
            img.onerror = () => {
                loadedCount++; // Still count it to avoid blocking
                if (loadedCount === frameCount) setImages(loadedImages);
            };
            loadedImages.push(img);
        }
        setImages(loadedImages);
    }, [frameCount]);

    useEffect(() => {
        if (images.length === 0 || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const getScrollRange = () => {
            const statsSection = document.getElementById("stats-section");
            if (statsSection) {
                return statsSection.offsetTop;
            }
            return window.innerHeight * 4;
        };

        const drawImage = (img: HTMLImageElement) => {
            if (!canvas || !img || !img.complete) return;
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
            const scrollRange = getScrollRange();
            const scrollFraction = Math.min(Math.max(window.scrollY / scrollRange, 0), 1);
            const frameIndex = Math.min(frameCount - 1, Math.floor(scrollFraction * (frameCount - 1)));
            if (images[frameIndex]) drawImage(images[frameIndex]);
        };

        const handleScroll = () => {
            const scrollRange = getScrollRange();
            const scrollFraction = Math.min(Math.max(window.scrollY / scrollRange, 0), 1);
            const frameIndex = Math.min(frameCount - 1, Math.floor(scrollFraction * (frameCount - 1)));
            requestAnimationFrame(() => {
                if (images[frameIndex]) drawImage(images[frameIndex]);
            });
        };

        window.addEventListener("resize", updateCanvasSize);
        window.addEventListener("scroll", handleScroll, { passive: true });
        updateCanvasSize();

        return () => {
            window.removeEventListener("resize", updateCanvasSize);
            window.removeEventListener("scroll", handleScroll);
        };
    }, [images]);

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
                zIndex: 1, // Above body background
                pointerEvents: "none",
                opacity: loaded ? 1 : 0,
                transition: "opacity 1.5s ease-in-out",
                background: "#000"
            }}
        />
    );
}
