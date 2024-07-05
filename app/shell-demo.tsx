"use client";
import { useState } from "react";

const IMAGE_WIDTH = 347;
const IMAGE_HEIGHT = 313;
const IMAGE_URL =
  "https://g8ns89enncyakakf.public.blob.vercel-storage.com/shell-wMYBcvpftEjK2adsyKjTfROO60KnBb.png";

export function ShellDemo() {
  const [coords, setCoords] = useState<{ x: number; y: number } | null>(null);

  return (
    <>
      <link rel="preload" href={IMAGE_URL} as="image" />

      <span
        className="bg-white text-gray-700 dark:text-gray-300 dark:bg-gray-800 p-1 rounded-md whitespace-nowrap inline-block"
        onMouseMove={(e) => {
          setCoords({ x: e.clientX, y: e.clientY });
        }}
        onMouseLeave={() => {
          setCoords(null);
        }}
      >
        🖼️ initial page shell{" "}
        <span className="hidden md:inline-block">(hover me)</span>
      </span>

      {coords && (
        <span
          className="absolute bg-black text-white p-1 rounded-md"
          style={{
            top: coords.y - IMAGE_HEIGHT - 25 + window.scrollY,
            left: Math.min(
              Math.max(20, coords.x - IMAGE_WIDTH / 2),
              window.innerWidth - IMAGE_WIDTH - 20,
            ),
          }}
        >
          <img
            width={IMAGE_WIDTH}
            height={IMAGE_HEIGHT}
            className="rounded-md"
            alt="Screenshot of the PPR shell, showing no chart loaded, instead rendering its fallback"
            src={IMAGE_URL}
          />
        </span>
      )}
    </>
  );
}
