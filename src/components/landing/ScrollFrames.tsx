import { useEffect, useRef, useState } from "react";

const frameCount = 40;

export default function ScrollFrames() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= frameCount; i++) {
      const img = new window.Image();
      const frameNumber = i.toString().padStart(3, "0");
      img.src = `/imgframes/ezgif-frame-${frameNumber}.jpg`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === frameCount) {
          setImages(loadedImages);
          setLoaded(true);
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === frameCount) setLoaded(true);
      };
      loadedImages.push(img);
    }
  }, []);

  useEffect(() => {
    if (!loaded || images.length === 0 || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const getScrollRange = () => window.innerHeight * 4.2;

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
      const scrollFraction = Math.min(Math.max(window.scrollY / getScrollRange(), 0), 1);
      const frameIndex = Math.min(frameCount - 1, Math.floor(scrollFraction * frameCount));
      if (images[frameIndex]) drawImage(images[frameIndex]);
    };

    const handleScroll = () => {
      const scrollFraction = Math.min(Math.max(window.scrollY / getScrollRange(), 0), 1);
      const frameIndex = Math.min(frameCount - 1, Math.floor(scrollFraction * frameCount));
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
        opacity: loaded && images.length > 0 ? 0.35 : 0,
        transition: "opacity 1s ease-in-out",
        filter: "brightness(0.8) contrast(1.2)",
      }}
    />
  );
}
