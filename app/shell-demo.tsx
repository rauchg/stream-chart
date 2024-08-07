"use client";
import { useState } from "react";

const IMAGE_WIDTH = 347;
const IMAGE_HEIGHT = 313;
const IMAGE_URL =
  "https://g8ns89enncyakakf.public.blob.vercel-storage.com/screenshot-xxiBZ7us4YltZzHys62XTnBhw6zEgc.png";
const IMAGE_URL_DARK =
  "https://g8ns89enncyakakf.public.blob.vercel-storage.com/screenshot-dark-klL6xoFDU7npJmWC5CSXpmHY1ZIEwQ.png";

export function ShellDemo() {
  const [coords, setCoords] = useState<{ x: number; y: number } | null>(null);

  return (
    <>
      <link rel="preload" href={IMAGE_URL} as="image" />
      <link
        rel="preload"
        href={IMAGE_URL_DARK}
        as="image"
        media="(prefers-color-scheme: dark)"
      />

      <span
        className="bg-muted text-muted-foreground p-1 rounded-md whitespace-nowrap inline-block"
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
            className="rounded-md dark:hidden"
            alt="Screenshot of the PPR shell, showing no chart loaded, instead rendering its fallback"
            src={IMAGE_URL}
          />
          <img
            width={IMAGE_WIDTH}
            height={IMAGE_HEIGHT}
            className="rounded-md hidden dark:inline-block"
            alt="Screenshot of the PPR shell, showing no chart loaded, instead rendering its fallback"
            src={IMAGE_URL_DARK}
          />
        </span>
      )}
    </>
  );
}
